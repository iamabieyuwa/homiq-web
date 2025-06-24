import { useState } from "react";
import { Menu, X, Bell } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { agent, user } = useAuth();
  const navigate = useNavigate();

  // Nav items for both user and agent (logged in only)
  const navItems = [
    { name: "Home", path: "/" },
    { name: user ? "Buy" : "Properties", path: "/properties" },
    { name: "Agents", path: "/agents" },
    { name: "About", path: "/about" },
    // Show "Requests" if either user or agent is logged in
    ...(user || agent ? [{ name: "Requests", path: "/request" }] : []),
    ...(user
      ? [{ name: "Dashboard", path: "/customer/dashboard" }]
      : []),
    ...(agent
      ? [{ name: "Dashboard", path: "/agent/dashboard" }]
      : []),
  ];

  const showNotification = Boolean(user || agent);

  // Close menu on navigation
  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="w-full fixed top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-200 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-1 min-w-0">
          <NavLink to="/" className="text-2xl font-bold text-primary whitespace-nowrap">
            Homiq
          </NavLink>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium justify-center flex-1">
          {navItems.map((item, idx) => (
            <li key={item.name} className={`relative group cursor-pointer${idx !== 0 ? " ml-2" : ""}`}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `text-black hover:text-primary transition font-medium py-1 px-2 rounded-md ${
                    isActive && location.pathname === item.path ? "active-link bg-primary/10" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
              <span
                className={`absolute left-0 bottom-[-4px] h-[2px] bg-primary transition-all ${
                  location.pathname === item.path ? "w-full" : "w-0"
                }`}
              />
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex-1 flex justify-end items-center gap-2">
          {/* Notification Icon */}
          {showNotification && (
            <button
              className="relative mr-3 p-2 rounded-full transition hover:bg-gray-200 group"
              aria-label="Notifications"
              title="Notifications"
              onClick={() => navigate("/notifications")}
              type="button"
            >
              <Bell size={22} className="text-primary transition group-hover:text-primary" />
            </button>
          )}
          {/* Agent avatar / Auth buttons */}
          {agent ? (
            <button
              onClick={() => navigate("/agent/dashboard")}
              className="ml-2 rounded-full border-2 border-primary p-0.5 hover:ring-2 ring-primary transition shadow"
              style={{ lineHeight: 0 }}
              title="Go to dashboard"
            >
              <img
                src={agent.profilePicture || "/default-agent.png"}
                alt="Agent Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>
          ) : user ? (
            <button
              onClick={() => navigate("/customer/dashboard")}
              className="ml-2 bg-primary text-white px-4 py-2 rounded-full text-xs md:text-sm hover:opacity-90 transition min-w-[110px]"
              type="button"
              title="Go to dashboard"
            >
              My Account
            </button>
          ) : (
            <>
              <NavLink to="/agents/login" className="hidden md:block ml-2">
                <button
                  className="bg-primary text-white px-4 py-2 rounded-full text-xs md:text-sm hover:opacity-90 transition min-w-[120px]"
                  type="button"
                >
                  Become an Agent
                </button>
              </NavLink>
              <NavLink to="/register" className="hidden md:block ml-2">
                <button
                  className="bg-black text-white px-4 py-2 rounded-full text-xs md:text-sm hover:opacity-80 transition min-w-[120px]"
                  type="button"
                >
                  Create Account
                </button>
              </NavLink>
            </>
          )}
          <button
            className="md:hidden p-2 rounded-md transition hover:bg-gray-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu & Backdrop */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setMenuOpen(false)}></div>
          <div className="fixed top-0 right-0 left-0 z-50 bg-white border-b border-gray-200 shadow-lg animate-slideDown">
            <ul className="flex flex-col gap-2 px-4 py-6">
              {navItems.map((item) => (
                <li key={item.name} className="mb-1">
                  <button
                    onClick={() => handleNav(item.path)}
                    className={`block w-full text-left py-3 px-2 rounded text-black font-medium hover:bg-primary/10 ${
                      location.pathname === item.path ? "text-primary bg-primary/10" : ""
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              {agent && (
                <li className="border-t border-gray-200 mt-2 pt-2 flex items-center gap-3">
                  <img
                    src={agent.profilePicture || "/default-agent.png"}
                    alt="Agent Avatar"
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                  />
                  <button
                    onClick={() => handleNav("/agent/dashboard")}
                    className="text-primary font-semibold"
                  >
                    Dashboard
                  </button>
                </li>
              )}
              {user && !agent && (
                <li className="border-t border-gray-200 mt-2 pt-2">
                  <button
                    onClick={() => handleNav("/customer/dashboard")}
                    className="w-full bg-primary text-white py-2 rounded-full text-sm hover:opacity-90 transition my-1"
                  >
                    My Account
                  </button>
                </li>
              )}
              {/* Show auth buttons if not logged in */}
              {!user && !agent && (
                <>
                  <li className="mt-2">
                    <button
                      onClick={() => handleNav("/agents/login")}
                      className="w-full bg-primary text-white py-2 rounded-full text-sm hover:opacity-90 transition my-1"
                    >
                      Become an Agent
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNav("/register")}
                      className="w-full bg-black text-white py-2 rounded-full text-sm hover:opacity-80 transition my-1"
                    >
                      Create Account
                    </button>
                  </li>
                </>
              )}
              {showNotification && (
                <li>
                  <button
                    className="flex items-center gap-2 w-full py-3 px-2 rounded hover:bg-primary/10"
                    aria-label="Notifications"
                    title="Notifications"
                    onClick={() => handleNav("/notifications")}
                  >
                    <Bell size={22} className="text-primary" />
                    <span className="font-semibold text-primary">Notifications</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </>
      )}
      {/* Custom animation for slide down */}
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-70px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown {
          animation: slideDown 0.25s ease;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;