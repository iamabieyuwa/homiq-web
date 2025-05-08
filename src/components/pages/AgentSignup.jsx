import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5 dark:from-black dark:to-black">
      <div className="bg-white dark:bg-black p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Agent Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            autoComplete="name"
            required
          />
          <input
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <input
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            autoComplete="tel"
            required
          />
          <input
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          {/* Profile Picture File Selector */}
          <div>
            <label className="block mb-2 text-sm font-medium text-primary">
              Profile Picture <span className="text-red-600">*</span>
            </label>
            {previewUrl ? (
              <div className="flex flex-col items-center gap-2 mb-2">
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full object-cover border-2 border-primary shadow"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleEditImage}
                    className="text-white bg-blue-600 px-4 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-white bg-red-600 px-4 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
                >
                  Select Profile Picture
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
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
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
              <input
                className="w-full border px-3 py-2 rounded"
                name="linkedin"
                type="url"
                placeholder="LinkedIn URL"
                value={form.linkedin}
                onChange={handleChange}
              />
              <input
                className="w-full border px-3 py-2 rounded"
                name="instagram"
                type="url"
                placeholder="Instagram URL"
                value={form.instagram}
                onChange={handleChange}
              />
              <input
                className="w-full border px-3 py-2 rounded"
                name="facebook"
                type="url"
                placeholder="Facebook URL"
                value={form.facebook}
                onChange={handleChange}
              />
              <input
                className="w-full border px-3 py-2 rounded"
                name="twitter"
                type="url"
                placeholder="Twitter/X URL"
                value={form.twitter}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Passwords */}
          <input
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <input
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded font-semibold mt-2 hover:bg-primary/90 transition"
          >
            Sign Up
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
    </section>
  );
}