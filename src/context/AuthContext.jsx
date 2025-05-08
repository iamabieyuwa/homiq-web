import { createContext, useContext, useState, useEffect } from "react";

// This mock agent data would be replaced with real user data from backend in production
const mockAgent = {
  id: 1,
  fullName: "Agent Demo",
  email: "agent@homiq.com",
  profilePicture: "",
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [agent, setAgent] = useState(() => {
    const stored = localStorage.getItem("agentAuth");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  // For demo: login with any email/password
  function login({ email, password, stayLoggedIn }) {
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

  function logout() {
    setAgent(null);
    localStorage.removeItem("agentAuth");
  }

  useEffect(() => {
    // persist to localStorage if agent state changes
    if (agent) {
      localStorage.setItem("agentAuth", JSON.stringify(agent));
    }
  }, [agent]);

  return (
    <AuthContext.Provider value={{ agent, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);