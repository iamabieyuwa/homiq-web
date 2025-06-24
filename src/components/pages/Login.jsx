import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Replace with real login logic!
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    // Simulate login success
    navigate("/");
  }

  function handleProviderLogin(provider) {
    // Implement OAuth here
    alert(`Login with ${provider} coming soon!`);
  }

  return (
    <section className="min-h-screen flex items-start justify-center bg-white relative pt-8 sm:pt-8">
      <div className="w-full max-w-xs">
        <div
          className="relative z-10 bg-white rounded-2xl shadow-2xl border border-black px-4 py-8 flex flex-col items-center"
          style={{
            marginTop: 'min(7vh, 2.5rem)' // Push DOWN from the top (move the box up)
          }}
        >
          <div className="flex items-center justify-center mb-4 bg-black text-white rounded-full w-12 h-12">
            <FaUser className="text-2xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black text-center">Login</h2>
          
          <form className="w-full space-y-4" onSubmit={handleSubmit} autoComplete="off">
            <div className="flex items-center border border-black/80 rounded-lg px-3 py-2 bg-white focus-within:shadow-lg">
              <FaEnvelope className="text-black mr-2 opacity-80" />
              <input
                className="flex-1 outline-none bg-transparent text-black text-base placeholder:text-gray-400"
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center border border-black/80 rounded-lg px-3 py-2 bg-white focus-within:shadow-lg">
              <FaLock className="text-black mr-2 opacity-80" />
              <input
                className="flex-1 outline-none bg-transparent text-black text-base placeholder:text-gray-400"
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-black hover:text-white transition text-base flex items-center justify-center gap-2"
            >
              <FaUser className="inline-block" />
              Login
            </button>
          </form>

          <div className="flex items-center w-full my-4">
            <div className="flex-1 border-t border-black" />
            <span className="px-3 text-black text-xs whitespace-nowrap">Or login with</span>
            <div className="flex-1 border-t border-black" />
          </div>

          <div className="flex gap-4 mb-1">
            <button
              onClick={() => handleProviderLogin("Google")}
              className="bg-black text-white border border-black hover:bg-red-600 hover:text-white rounded-full p-3 transition flex items-center justify-center"
              title="Login with Google"
              type="button"
            >
              <FaGoogle className="text-lg" />
            </button>
            <button
              onClick={() => handleProviderLogin("Facebook")}
              className="bg-black text-white border border-black hover:bg-red-600 hover:text-white rounded-full p-3 transition flex items-center justify-center"
              title="Login with Facebook"
              type="button"
            >
              <FaFacebookF className="text-lg" />
            </button>
            <button
              onClick={() => handleProviderLogin("Twitter")}
              className="bg-black text-white border border-black hover:bg-red-600 hover:text-white rounded-full p-3 transition flex items-center justify-center"
              title="Login with Twitter"
              type="button"
            >
              <FaTwitter className="text-lg" />
            </button>
          </div>

          <div className="mt-4 text-sm text-black text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-red-600 font-semibold hover:underline">
              Create one
            </Link>
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