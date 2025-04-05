import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/appSlice";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      let res = await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

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

        {/* Search Bar */}
        {/*<div className="w-full md:w-1/2 lg:w-2/5 px-2 md:px-4 my-2 md:my-0">
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:hidden sm:hidden hidden px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div> */}

        {/* Profile Dropdown */}
        {user ? (
          <div className="w-full sm:w-auto flex justify-end items-center gap-2  sm:mt-0 px-2 sm:px-0 relative">
            <div className="text-white font-semibold text-sm sm:text-base md:text-lg">
              Welcome {user.name}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
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
              <ul className="absolute right-2 top-14 sm:top-12 -mt-4 md:-mt-1  w-36 bg-white rounded-lg shadow-lg text-gray-700 p-2 space-y-2 z-50">
                <Link
                  to={"/profile"}
                  className="block hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                >
                  Profile
                </Link>
                <li
                  className="hover:bg-red-500 hover:text-white p-2 rounded-md cursor-pointer"
                  onClick={handleLogout}
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
