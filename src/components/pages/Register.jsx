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
    // Replace with real registration logic!
    if (!form.fullName || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    navigate("/login");
  }

  function handleProviderLogin(provider) {
    // Implement OAuth here
    alert(`Login with ${provider} coming soon!`);
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="bg-white dark:bg-black p-8 rounded-xl shadow-xl w-full max-w-md flex flex-col items-center border border-black">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Create Account</h2>
        
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center border border-black rounded px-3 py-2 bg-white dark:bg-black">
            <FaUser className="text-black dark:text-white mr-2" />
            <input
              className="flex-1 outline-none bg-transparent text-black dark:text-white"
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center border border-black rounded px-3 py-2 bg-white dark:bg-black">
            <FaEnvelope className="text-black dark:text-white mr-2" />
            <input
              className="flex-1 outline-none bg-transparent text-black dark:text-white"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center border border-black rounded px-3 py-2 bg-white dark:bg-black">
            <FaLock className="text-black dark:text-white mr-2" />
            <input
              className="flex-1 outline-none bg-transparent text-black dark:text-white"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className=" cursor-pointer w-full bg-red-600 text-white font-semibold py-2 rounded hover:bg-black hover:text-white transition"
          >
            Create Account
          </button>
        </form>

        <div className="flex items-center w-full my-4">
          <div className="flex-1 border-t border-black" />
          <span className="px-3 text-black dark:text-white text-xs">Or sign up with</span>
          <div className="flex-1 border-t border-black" />
        </div>

        <div className="flex gap-4 mb-2">
          <button
            onClick={() => handleProviderLogin("Google")}
            className="bg-black text-white border border-black hover:bg-red-600 hover:text-white rounded-full p-3 transition"
            title="Sign up with Google"
          >
            <FaGoogle className="text-lg" />
          </button>
          <button
            onClick={() => handleProviderLogin("Facebook")}
            className="bg-black text-white border border-black hover:bg-red-600 hover:text-white rounded-full p-3 transition"
            title="Sign up with Facebook"
          >
            <FaFacebookF className="text-lg" />
          </button>
          <button
            onClick={() => handleProviderLogin("Twitter")}
            className="bg-black text-white border border-black hover:bg-red-600 hover:text-white rounded-full p-3 transition"
            title="Sign up with Twitter"
          >
            <FaTwitter className="text-lg" />
          </button>
        </div>

        <div className="mt-2 text-sm text-black dark:text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-semibold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}