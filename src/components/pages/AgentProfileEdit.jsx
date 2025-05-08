import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AgentProfileEdit() {
  const { agent, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [form, setForm] = useState({
    fullName: agent.fullName || "",
    email: agent.email || "",
    phone: agent.phone || "",
    address: agent.address || "",
    profilePicture: agent.profilePicture || "",
    about: agent.about || "",
    linkedin: agent.linkedin || "",
    instagram: agent.instagram || "",
    facebook: agent.facebook || "",
    twitter: agent.twitter || "",
  });

  const [previewUrl, setPreviewUrl] = useState(agent.profilePicture || "");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, update via backend + update AuthContext
    // For demo, update localStorage and reload
    const updatedAgent = { ...agent, ...form };
    localStorage.setItem("agentAuth", JSON.stringify(updatedAgent));
    setSuccess("Profile updated!");
    setTimeout(() => {
      window.location.href = "/agent/dashboard";
    }, 1000);
  };

  if (!agent) {
    navigate("/agent/login");
    return null;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5 dark:from-black dark:to-black">
      <div className="bg-white dark:bg-black p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-primary">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <img
              src={previewUrl || "/default-agent.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow mb-2"
            />
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="bg-primary text-white px-3 py-1 rounded"
              >
                Change Photo
              </button>
              {previewUrl && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <input
            className="w-full border px-3 py-2 rounded"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border px-3 py-2 rounded"
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border px-3 py-2 rounded"
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            className="w-full border px-3 py-2 rounded"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />
          <textarea
            className="w-full border px-3 py-2 rounded"
            name="about"
            placeholder="Short Bio/About"
            value={form.about}
            onChange={handleChange}
            rows={2}
          />
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
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded font-semibold mt-2 hover:bg-primary/90"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="w-full bg-red-600 text-white py-2 rounded font-semibold mt-2 hover:bg-red-700"
            onClick={() => {
              logout();
              navigate("/agent/login");
            }}
          >
            Logout
          </button>
        </form>
      </div>
    </section>
  );
}