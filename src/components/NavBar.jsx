import { useState } from "react";
import { Link } from "react-router";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between ml-2">
        {/* Logo / Brand Name */}
        <Link to={"/"} className="text-white text-2xl font-bold w-1/4">
          SmartPedagogy
        </Link>

        {/* Search Bar */}
        <div className="hidden md:block w-4/5 mx-10">
          <input c
            type="text"
            placeholder="Search..."
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          />
        </div>

        {/* Profile Dropdown */}
        <div className="relative w-1/4 flex justify-end ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <ul className="absolute right-0 mt-9 w-40 bg-white rounded-lg shadow-lg text-gray-700 p-2 space-y-2">
              <li className="hover:bg-gray-200 p-2 rounded-md cursor-pointer">
                Profile
              </li>
              <li className="hover:bg-gray-200 p-2 rounded-md cursor-pointer">
                Settings
              </li>
              <li className="hover:bg-red-500 hover:text-white p-2 rounded-md cursor-pointer">
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
