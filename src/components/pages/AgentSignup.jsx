import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaPhoneAlt, FaHome, FaLock, FaLinkedin,
  FaInstagram, FaFacebookF, FaTwitter, FaCamera
} from "react-icons/fa";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  profilePicture: "",
  about: "",
  linkedin: "",
  instagram: "",
  facebook: "",
  twitter: "",
  password: "",
  confirmPassword: "",
};

export default function AgentSignup() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [editingImage, setEditingImage] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          profilePicture: reader.result,
        }));
        setPreviewUrl(reader.result);
        setEditingImage(false);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Please select a valid image file.");
    }
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({
      ...prev,
      profilePicture: "",
    }));
    setPreviewUrl("");
    setEditingImage(false);
  };

  const handleEditImage = () => {
    setEditingImage(true);
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.password ||
      !form.confirmPassword ||
      !form.profilePicture
    ) {
      setError("Please fill in all required fields, including your profile picture.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setTimeout(() => {
      setSuccess("Signup successful! Redirecting...");
      setTimeout(() => {
        navigate("/agent/login");
      }, 1200);
    }, 800);
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-primary text-center">Agent Signup</h2>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="flex items-center border border-black/80 rounded-lg px-3 py-2 bg-white focus-within:shadow-lg">
              <FaUser className="text-black mr-2 opacity-80" />
              <input
                className="flex-1 outline-none bg-transparent text-black text-base placeholder:text-gray-400"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>
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
              <FaPhoneAlt className="text-black mr-2 opacity-80" />
              <input
                className="flex-1 outline-none bg-transparent text-black text-base placeholder:text-gray-400"
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
              />
            </div>
            <div className="flex items-center border border-black/80 rounded-lg px-3 py-2 bg-white focus-within:shadow-lg">
              <FaHome className="text-black mr-2 opacity-80" />
              <input
                className="flex-1 outline-none bg-transparent text-black text-base placeholder:text-gray-400"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Profile Picture File Selector */}
            <div>
              <label className="block mb-2 text-sm font-medium text-primary">
                Profile Picture <span className="text-red-600">*</span>
              </label>
              {previewUrl ? (
                <div className="flex flex-col items-center gap-2 mb-2">
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Profile Preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-primary shadow"
                    />
                    <button
                      type="button"
                      onClick={handleEditImage}
                      className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 border-2 border-white shadow hover:bg-primary/90 transition"
                      title="Edit photo"
                      tabIndex={-1}
                    >
                      <FaCamera className="text-xs" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-white bg-red-600 px-4 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
                  >
                    <FaCamera /> Select Profile Picture
                  </button>
                  <div className="text-xs text-gray-500">Only image files allowed</div>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {!form.profilePicture && (
                <div className="text-xs text-red-600 mt-1">Profile picture is required.</div>
              )}
            </div>

            <textarea
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary text-black"
              name="about"
              placeholder="Short Bio/About (optional)"
              value={form.about}
              onChange={handleChange}
              rows={2}
            />
            {/* Social Media Links */}
            <div>
              <label className="block mb-1 text-sm font-medium">Social Media Links (optional)</label>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center border border-black/20 rounded-lg px-3 py-2 bg-white">
                  <FaLinkedin className="text-blue-700 mr-2" />
                  <input
                    className="flex-1 outline-none bg-transparent text-black text-base placeholder:text-gray-400"
                    name="linkedin"
                    type="url"
                    placeholder="LinkedIn URL"
                    value={form.linkedin}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center border border-black/20 rounded-lg px-3 py-2 bg-white">
                  <FaInstagram className="text-pink-600 mr-2" />
                  <input
                    className="flex-1 outline-none bg-transparent text-black text-base placeholder:text-gray-400"
                    name="instagram"
                    type="url"
                    placeholder="Instagram URL"
                    value={form.instagram}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center border border-black/20 rounded-lg px-3 py-2 bg-white">
                  <FaFacebookF className="text-blue-600 mr-2" />
                  <input
                    className="flex-1 outline-none bg-transparent text-black text-base placeholder:text-gray-400"
                    name="facebook"
                    type="url"
                    placeholder="Facebook URL"
                    value={form.facebook}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center border border-black/20 rounded-lg px-3 py-2 bg-white">
                  <FaTwitter className="text-sky-500 mr-2" />
                  <input
                    className="flex-1 outline-none bg-transparent text-black text-base placeholder:text-gray-400"
                    name="twitter"
                    type="url"
                    placeholder="Twitter/X URL"
                    value={form.twitter}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {/* Passwords */}
            <div className="flex items-center border border-black/80 rounded-lg px-3 py-2 bg-white focus-within:shadow-lg">
              <FaLock className="text-black mr-2 opacity-80" />
              <input
                className="flex-1 outline-none bg-transparent text-black text-base placeholder:text-gray-400"
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="flex items-center border border-black/80 rounded-lg px-3 py-2 bg-white focus-within:shadow-lg">
              <FaLock className="text-black mr-2 opacity-80" />
              <input
                className="flex-1 outline-none bg-transparent text-black text-base placeholder:text-gray-400"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg font-semibold mt-2 hover:bg-primary/90 transition flex items-center justify-center gap-2"
            >
              <FaUser /> Sign Up
            </button>
          </form>
          <div className="text-sm text-center mt-5">
            Already have an account?{" "}
            <a
              href="/agents/login"
              className="text-primary hover:underline font-semibold"
            >
              Login
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