import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 ">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          {/*<img src="/logo192.png" alt="Logo" className="h-8 w-8" />*/}
          <span className="font-bold text-lg tracking-wide">Homiq</span>
        </div>
        <div className="flex gap-4 mt-2 md:mt-0 text-xl">
          <a href="https://instagram.com" aria-label="Instagram" className="hover:text-red-500">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="hover:text-red-500">
            <FaTwitter />
          </a>
          <a href="https://facebook.com" aria-label="Facebook" className="hover:text-red-500">
            <FaFacebook />
          </a>
          <a href="https://youtube.com" aria-label="YouTube" className="hover:text-red-500">
            <FaYoutube />
          </a>
        </div>


        <nav className="flex flex-wrap gap-6 justify-center text-sm">
          <Link to="/" className="hover:text-red-500">Home</Link>
          <Link to="/properties" className="hover:text-red-500">Browse</Link>
          <Link to="/agent/listings" className="hover:text-red-500">Agent Dashboard</Link>
          <Link to="/about" className="hover:text-red-500">About</Link>
          <Link to="/contact" className="hover:text-red-500">Buy</Link>
        </nav>
        
        <div className="text-xs text-gray-400 mt-2 md:mt-0 text-center md:text-right w-full md:w-auto">
          &copy; {new Date().getFullYear()} Homiq. All rights reserved.
        </div>
      </div>
    </footer>
  );
}