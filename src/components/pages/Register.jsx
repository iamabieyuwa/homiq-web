import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
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
    if (!form.fullName || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    navigate("/login");
  }

  function handleProviderLogin(provider) {
    alert(`Login with ${provider} coming soon!`);
  }

  return (
    <section className="min-h-screen flex items-end justify-center bg-white relative pb-55">
      <div className="w-full max-w-xs">
        <div
          className="relative z-10 bg-white rounded-2xl shadow-2xl border border-black px-4 py-8 flex flex-col items-center"
          style={{
            marginBottom: 'min(7vh, 2.5rem)' // Push up from the bottom a little on mobile & desktop
          }}
        >
          <div className="flex items-center justify-center mb-4 bg-black text-white rounded-full w-12 h-12">
            <FaUser className="text-2xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black text-center">Create Account</h2>
          
          <form className="w-full space-y-4" onSubmit={handleSubmit} autoComplete="off">
            <div className="flex items-center border border-black/80 rounded-lg px-3 py-2 bg-white focus-within:shadow-lg">
              <FaUser className="text-black mr-2 opacity-80" />
              <input
                className="flex-1 outline-none bg-transparent text-black text-base placeholder:text-gray-400"
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
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
              Create Account
            </button>
          </form>

          <div className="flex items-center w-full my-4">
            <div className="flex-1 border-t border-black" />
            <span className="px-3 text-black text-xs whitespace-nowrap">Or sign up with</span>
            <div className="flex-1 border-t border-black" />
          </div>

          <div className="flex gap-4 mb-1">
            <button
              onClick={() => handleProviderLogin("Google")}
              className="bg-black text-white border border-black hover:bg-red-600 hover:text-white rounded-full p-3 transition flex items-center justify-center"
              title="Sign up with Google"
              type="button"
            >
              <FaGoogle className="text-lg" />
            </button>
            <button
              onClick={() => handleProviderLogin("Facebook")}
              className="bg-black text-white border border-black hover:bg-red-600 hover:text-white rounded-full p-3 transition flex items-center justify-center"
              title="Sign up with Facebook"
              type="button"
            >
              <FaFacebookF className="text-lg" />
            </button>
            <button
              onClick={() => handleProviderLogin("Twitter")}
              className="bg-black text-white border border-black hover:bg-red-600 hover:text-white rounded-full p-3 transition flex items-center justify-center"
              title="Sign up with Twitter"
              type="button"
            >
              <FaTwitter className="text-lg" />
            </button>
          </div>

          <div className="mt-4 text-sm text-black text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-red-600 font-semibold hover:underline">
              Login
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