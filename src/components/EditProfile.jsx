import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/appSlice";

const EditProfile = ({ user }) => {
  const [name, setName] = useState(user?.name);
  const [profilePic, setProfilePic] = useState(user?.photoUrl);
  const [message, setMessage] = useState(""); // ✅ Success message

  const dispatch = useDispatch();

  const handleSaveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          name,
          profilePic,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      setMessage("Profile updated successfully!");

      // Optional: Auto-hide after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch (error) {
      console.error("Profile update failed:", error);
      setMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative">
          {/* Success Message */}
          {message && (
            <div className="absolute -top-16 left-0 right-0 px-4">
              <p className="text-center text-green-500 font-semibold bg-green-100 p-2 rounded">
                {message}
              </p>
            </div>
          )}

          <h2 className="text-white text-2xl font-bold mb-4 text-center">
            Edit Profile
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveProfile();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              name="Name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            />

            <input
              type="text"
              name="photoUrl"
              placeholder="Photo URL"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full p-2 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
