import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/appSlice";
import Teachers from "../pages/teachers/Teachers";
import Students from "../pages/students/Students";
const Body = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userProfile = async () => {
    try {
      let res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      // console.log(res.data);
    } catch (err) {
      navigate("/login");
      console.log(err.message);
    }
  };

  useEffect(() => {
    !user && userProfile();
  }, []);

  return <>{user?.role === "teacher" ? <Teachers /> : <Students />}</>;
};

export default Body;
