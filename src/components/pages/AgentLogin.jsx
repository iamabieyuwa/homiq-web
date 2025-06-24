import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

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
    <section className="min-h-screen flex items-start justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5 pt-8 sm:pt-14">
      <div className="w-full max-w-xs">
        <div
          className="bg-white rounded-2xl shadow-2xl border border-black px-4 py-8 flex flex-col items-center"
          style={{
            marginTop: 'min(7vh, 2.5rem)'
          }}
        >
          <div className="flex items-center justify-center mb-4 bg-black text-white rounded-full w-12 h-12">
            <FaUser className="text-2xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-primary text-center">Agent Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="flex items-center border border-black/80 rounded-lg px-3 py-2 bg-white focus-within:shadow-lg">
              <FaEnvelope className="text-black mr-2 opacity-80" />
              <input
                className="flex-1 outline-none bg-transparent text-black text-base placeholder:text-gray-400"
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
            <div className="flex items-center border border-black/80 rounded-lg px-3 py-2 bg-white focus-within:shadow-lg">
              <FaLock className="text-black mr-2 opacity-80" />
              <input
                className="flex-1 outline-none bg-transparent text-black text-base placeholder:text-gray-400"
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>
            <label className="flex items-center gap-2 text-sm pl-1">
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
              className="w-full bg-primary text-white py-2 rounded-lg font-semibold mt-2 hover:bg-primary/90 transition flex items-center justify-center gap-2"
              disabled={loading}
            >
              <FaUser className="inline-block" />
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="text-sm text-center mt-5">
            Don&apos;t have an account?{" "}
            <a
              href="/agent/signup"
              className="text-primary hover:underline font-semibold"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
      {/* Soft background shadow for lifted effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0"
        style={{
          zIndex: 1,
          bottom: '0',
          top: 'auto',
          height: '150px',
          width: '100%',
          filter: 'blur(36px)',
          background: 'linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.08))',
        }}
      />
    </section>
  );
}