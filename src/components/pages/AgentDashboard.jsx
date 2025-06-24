import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaHome, FaUserEdit, FaSignOutAlt, FaList, FaLinkedin, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

export default function AgentDashboard() {
  const { agent, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/agent/login");
  };

  return (
    <section className="min-h-screen flex items-start justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5 pt-8 sm:pt-14">
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg">
        <div className="bg-white rounded-2xl shadow-2xl border border-black px-4 py-8 flex flex-col items-center"
          style={{
            marginTop: 'min(7vh, 2.5rem)'
          }}
        >
          <div className="w-24 h-24 mb-4 flex justify-center items-center relative">
            <img
              src={agent.profilePicture || "/default-agent.png"}
              alt={agent.fullName || "Agent"}
              className="w-24 h-24 rounded-full border-4 border-primary shadow object-cover"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-primary text-center break-words">{agent.fullName}</h2>
          <div className="flex flex-col items-center w-full mb-2 space-y-2">
            <div className="flex items-center gap-2 text-gray-600 text-sm flex-wrap justify-center">
              <FaEnvelope className="text-primary" />
              <span className="truncate">{agent.email}</span>
            </div>
            {agent.phone && (
              <div className="flex items-center gap-2 text-gray-600 text-sm flex-wrap justify-center">
                <FaPhoneAlt className="text-primary" />
                <span className="truncate">{agent.phone}</span>
              </div>
            )}
            {agent.address && (
              <div className="flex items-center gap-2 text-gray-600 text-sm flex-wrap justify-center">
                <FaHome className="text-primary" />
                <span className="truncate">{agent.address}</span>
              </div>
            )}
            {agent.about && (
              <div className="flex items-center gap-2 text-gray-700 text-sm flex-wrap justify-center">
                <FaUserEdit className="text-primary" />
                <span className="italic text-center break-words">{agent.about}</span>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-3 my-3 justify-center text-lg">
            {agent.linkedin && (
              <a
                href={agent.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition"
                title="LinkedIn"
              >
                <FaLinkedin />
              </a>
            )}
            {agent.instagram && (
              <a
                href={agent.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800 transition"
                title="Instagram"
              >
                <FaInstagram />
              </a>
            )}
            {agent.facebook && (
              <a
                href={agent.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-blue-900 transition"
                title="Facebook"
              >
                <FaFacebookF />
              </a>
            )}
            {agent.twitter && (
              <a
                href={agent.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:text-sky-800 transition"
                title="Twitter/X"
              >
                <FaTwitter />
              </a>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full mt-6 mb-2">
            <button
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold px-4 py-2 rounded-lg transition flex items-center justify-center gap-2"
              onClick={() => navigate("/agent/listings")}
            >
              <FaList /> My Listings
            </button>
            <button
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold px-4 py-2 rounded-lg transition flex items-center justify-center gap-2"
              onClick={() => navigate("/agent/edit-profile")}
            >
              <FaUserEdit /> Edit Profile
            </button>
            <button
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition flex items-center justify-center gap-2"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}