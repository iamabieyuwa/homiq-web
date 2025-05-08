import { createContext, useContext, useState, useEffect } from "react";

// Mock data for demo purposes
const mockAgent = {
  id: 1,
  fullName: "Agent Demo",
  email: "agent@homiq.com",
  profilePicture: "",
};

const mockUser = {
  id: 2,
  fullName: "User Demo",
  email: "user@homiq.com",
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [agent, setAgent] = useState(() => {
    const stored = localStorage.getItem("agentAuth");
    return stored ? JSON.parse(stored) : null;
  });

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("userAuth");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(false);

  // Login function for agent
  function loginAgent({ email, password, stayLoggedIn }) {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setAgent({ ...mockAgent, email });
        if (stayLoggedIn) {
          localStorage.setItem(
            "agentAuth",
            JSON.stringify({ ...mockAgent, email })
          );
        }
        setLoading(false);
        resolve(true);
      }, 900);
    });
  }

  // Login function for regular user
  function loginUser({ email, password, stayLoggedIn }) {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser({ ...mockUser, email });
        if (stayLoggedIn) {
          localStorage.setItem(
            "userAuth",
            JSON.stringify({ ...mockUser, email })
          );
        }
        setLoading(false);
        resolve(true);
      }, 900);
    });
  }

  // Logout function (handles both agent and user)
  function logout() {
    setAgent(null);
    setUser(null);
    localStorage.removeItem("agentAuth");
    localStorage.removeItem("userAuth");
  }

  useEffect(() => {
    // Persist agent state to localStorage
    if (agent) {
      localStorage.setItem("agentAuth", JSON.stringify(agent));
    }
  }, [agent]);

  useEffect(() => {
    // Persist user state to localStorage
    if (user) {
      localStorage.setItem("userAuth", JSON.stringify(user));
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        agent,
        user,
        loading,
        loginAgent,
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);