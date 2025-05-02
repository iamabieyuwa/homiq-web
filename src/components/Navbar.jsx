import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom"; // Import useLocation to detect the current path

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get the current path

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Set initial theme based on user/system
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const navItems = [
    { name: "Agents", path: "/agents/login" },
    { name: "Buy", path: "/buy" },
    { name: "Rent", path: "/rent" },
    { name: "Lease", path: "/lease" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full fixed top-0 z-50 backdrop-blur bg-white/70 dark:bg-black/60 border-b border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-primary"
          
        >
          Homiq
        </NavLink>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-sm font-medium items-center text-black dark:text-white">
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

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <button className="btn-primary hidden md:inline-block">Login</button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`ml-2 p-2 rounded-full transition cursor-pointer
              ${darkMode ? "bg-white text-black " : "bg-white text-black"}
            `}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md transition 
              hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
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
            <li>
              <button className="btn-primary w-full">Login</button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;