import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AgentLogin() {
  const [form, setForm] = useState({ email: "", password: "", stayLoggedIn: false });
  const [error, setError] = useState("");
  const { agent, login, loading } = useAuth();
  const navigate = useNavigate();

  // If logged in, redirect to dashboard
  if (agent) {
    return <Navigate to="/agent/dashboard" replace />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("All fields are required!");
      return;
    }
    // Simulate login (accept any credentials for demo)
    try {
      await login(form);
      navigate("/agent/dashboard");
    } catch {
      setError("Invalid login credentials.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5 dark:from-black dark:to-black">
      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Agent Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border px-3 py-2 rounded"
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <input
            className="w-full border px-3 py-2 rounded"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="stayLoggedIn"
              checked={form.stayLoggedIn}
              onChange={handleChange}
            />
            Stay logged in
          </label>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded font-semibold mt-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-sm text-center mt-4">
          Don&apos;t have an account?{" "}
          <a
            href="/agent/signup"
            className="text-primary hover:underline"
          >
            Sign up
          </a>
        </div>
      </div>
    </section>
  );
}