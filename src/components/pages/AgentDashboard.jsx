import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AgentDashboard() {
  const { agent, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/agent/login");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5 dark:from-black dark:to-black">
      <div className="bg-white dark:bg-black p-8 rounded-xl shadow-xl w-full max-w-lg flex flex-col items-center">
        <div className="w-32 h-32 mb-4">
          <img
            src={agent.profilePicture || "/default-agent.png"}
            alt={agent.fullName || "Agent"}
            className="w-32 h-32 rounded-full border-4 border-primary shadow object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-primary text-center">{agent.fullName}</h2>
        <div className="flex flex-col items-center w-full mb-2 space-y-1">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-gray-500 font-semibold">Email:</span>
            <span className="text-gray-700 dark:text-gray-200">{agent.email}</span>
          </div>
          {agent.phone && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs text-gray-500 font-semibold">Phone:</span>
              <span className="text-gray-600 dark:text-gray-400">{agent.phone}</span>
            </div>
          )}
          {agent.address && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs text-gray-500 font-semibold">Address:</span>
              <span className="text-gray-600 dark:text-gray-400">{agent.address}</span>
            </div>
          )}
          {agent.about && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs text-gray-500 font-semibold">About:</span>
              <span className="text-gray-700 dark:text-gray-300 italic text-center">{agent.about}</span>
            </div>
          )}
        </div>
        <div className="flex gap-4 my-3 justify-center">
          {agent.linkedin && (
            <a
              href={agent.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          )}
          {agent.instagram && (
            <a
              href={agent.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              Instagram
            </a>
          )}
          {agent.facebook && (
            <a
              href={agent.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-800 hover:underline"
            >
              Facebook
            </a>
          )}
          {agent.twitter && (
            <a
              href={agent.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:underline"
            >
              Twitter/X
            </a>
          )}
        </div>
        {/* Flex row for dashboard action buttons */}
        <div className="flex flex-wrap gap-4 justify-center w-full mt-6 mb-2">
          <button
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2 rounded transition"
            onClick={() => navigate("/agent/listings")}
          >
            My Listings
          </button>
          <button
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2 rounded transition"
            onClick={() => navigate("/agent/edit-profile")}
          >
            Edit Profile
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}