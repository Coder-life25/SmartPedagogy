import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Teachers from "../pages/teachers/Teachers";
import Students from "../pages/students/Students";
const Body = () => {
  const user = useSelector((store) => store.user);

  return <>{user?.role === "teacher" ? <Teachers /> : <Students />}</>;
};

export default Body;
