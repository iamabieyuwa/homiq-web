import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const navItems = ["Buy", "Rent", "Lease", "Agents", "Contact"];

  return (
    <nav className="w-full fixed top-0 z-50 backdrop-blur bg-white/70 dark:bg-black/60 border-b border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-primary">Homiq</div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-sm font-medium items-center text-black dark:text-white">
          {navItems.map((item, index) => (
            <li key={index} className="relative group cursor-pointer">
              {item}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
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
    ${darkMode
      ? "bg-white text-black "
      : "bg-white text-black"}
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
                {item}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
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
