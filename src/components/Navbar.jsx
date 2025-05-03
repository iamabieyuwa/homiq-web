import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const navItems = [
    { name: "Buy", path: "/buy" },
    { name: "Rent", path: "/rent" },
    { name: "Agents", path: "/agents" },
  ];

  return (
    <nav className="w-full fixed top-0 z-50 backdrop-blur bg-white/70 dark:bg-black/60 border-b border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo (Left) */}
        <div className="flex-1">
          <NavLink to="/" className="text-2xl font-bold text-primary whitespace-nowrap">
            Homiq
          </NavLink>
        </div>

        {/* Center Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium justify-center flex-1 text-black dark:text-white">
          {navItems.map((item, index) => (
            <li key={index} className="relative group cursor-pointer">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `hover:text-primary transition font-medium ${
                    isActive && location.pathname === item.path ? "active-link" : ""
                  }`
                }
                style={({ isActive }) => ({
                  color: isActive && location.pathname === item.path ? "black" : "inherit",
                })}
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
          {/* Hide these buttons on mobile, show from md up */}
          <NavLink to="/agents/login" className="hidden md:block">
            <button
              className="bg-primary text-white px-4 py-2 rounded-full text-xs md:text-sm hover:opacity-90 transition whitespace-nowrap min-w-[120px]"
              type="button"
            >
              Become an Agent
            </button>
          </NavLink>
          <NavLink to="/register" className="hidden md:block">
            <button
              className="bg-black text-white px-4 py-2 rounded-full text-xs md:text-sm hover:opacity-90 transition whitespace-nowrap min-w-[120px]"
              type="button"
            >
              Create Account
            </button>
          </NavLink>
          <button
            onClick={toggleDarkMode}
            className="ml-2 p-2 rounded-full transition cursor-pointer bg-white text-black"
            type="button"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="md:hidden p-2 rounded-md transition hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 px-4 pb-4 pt-2">
          <ul className="flex flex-col gap-3 text-black dark:text-white">
            {navItems.map((item, index) => (
              <li key={index} className="relative group cursor-pointer">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `hover:text-primary transition font-medium ${
                      isActive && location.pathname === item.path ? "active-link" : ""
                    }`
                  }
                  style={({ isActive }) => ({
                    color: isActive && location.pathname === item.path ? "black" : "inherit",
                  })}
                  onClick={() => setMenuOpen(false)}
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
            {/* Show right-side buttons here in mobile menu */}
            <NavLink to="/agents/login" onClick={() => setMenuOpen(false)}>
              <button
                className="bg-primary text-white w-full py-2 rounded-full text-xs hover:opacity-90 transition whitespace-nowrap min-w-[120px] mt-2"
                type="button"
              >
                Become an Agent
              </button>
            </NavLink>
            <NavLink to="/register" onClick={() => setMenuOpen(false)}>
              <button
                className="bg-black text-white w-full py-2 rounded-full text-xs hover:opacity-90 transition whitespace-nowrap min-w-[120px] mt-2"
                type="button"
              >
                Create Account
              </button>
            </NavLink>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;