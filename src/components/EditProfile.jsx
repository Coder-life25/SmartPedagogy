import React, { useState, useTransition } from "react";

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/appSlice";

const EditProfile = ({ user }) => {
  //   console.log(user);
  const [name, setName] = useState(user?.name);

  const [profilePic, setProfilePic] = useState(user?.photoUrl);

  const dispatch = useDispatch();

  const handleSaveProfile = async () => {
    let res = await axios.patch(
      BASE_URL + "/profile/edit",
      {
        name,
        profilePic,
      },
      { withCredentials: true }
    );

    dispatch(addUser(res.data.data));
    console.log(res.data.data);
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-white text-2xl font-bold mb-4 text-center">
            Edit Profile
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("form submitted");
            }}
            className="space-y-4"
          >
            <input
              type="text"
              name="Name"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            />

            <input
              type="text"
              name="photoUrl"
              placeholder="Photo URL"
              value={profilePic}
              onChange={(e) => {
                setProfilePic(e.target.value);
              }}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full p-2 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition"
              onClick={handleSaveProfile}
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
