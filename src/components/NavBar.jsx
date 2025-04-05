import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/appSlice";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  // Close dropdown if click is outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 shadow-md p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo / Brand Name */}
        <div className="w-full sm:w-auto flex justify-between items-center mb-2 sm:mb-0 px-2 sm:px-0">
          <Link
            to={user ? "/" : "/login"}
            className="text-white text-2xl font-bold"
          >
            SmartPedagogy
          </Link>
        </div>

        {/* Profile Dropdown */}
        {user ? (
          <div
            className="w-full sm:w-auto flex justify-end items-center gap-2 px-2 sm:px-0 relative"
            ref={dropdownRef}
          >
            <div className="text-white font-semibold text-sm sm:text-base md:text-lg">
              Welcome {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
            </div>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="focus:outline-none"
            >
              <img
                src={user.profilePic}
                alt="User Avatar"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white"
              />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <ul className="absolute right-2 top-14 sm:top-12 w-36 bg-white rounded-lg shadow-lg text-gray-700 p-2 space-y-2 z-50">
                <Link
                  to="/profile"
                  className="block hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                >
                  Profile
                </Link>
                <li
                  onClick={handleLogout}
                  className="hover:bg-red-500 hover:text-white p-2 rounded-md cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;
