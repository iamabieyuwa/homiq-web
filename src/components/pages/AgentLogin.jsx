import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AgentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Placeholder authentication logic
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    // Simulate an API call (replace with real API logic)
    setTimeout(() => {
      // Dummy check — in production, check credentials via API
      if (email === "agent@example.com" && password === "password123") {
        setLoading(false);
        navigate("/agent/dashboard");
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <section className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white dark:bg-black shadow-md rounded-lg p-8 border border-black/10 dark:border-white/10">
        <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
          Agent Login
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm mb-1 text-black dark:text-white">
              Email
            </label>
            <input
              type="email"
              placeholder="agent@example.com"
              className="w-full px-4 py-2 border border-black/20 dark:border-white/20 rounded bg-white dark:bg-black text-black dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-black dark:text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="Your password"
              className="w-full px-4 py-2 border border-black/20 dark:border-white/20 rounded bg-white dark:bg-black text-black dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-full font-semibold hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          For demo: <span className="font-mono">agent@example.com / password123</span>
        </p>
      </div>
    </section>
  );
};

export default AgentLogin;