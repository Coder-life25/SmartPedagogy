import React from "react";
import { Link } from "react-router";
const Students = () => {
  return (
    <div>
      <div className="mx-10 my-10 flex ">
        <Link to={"/dashboardOverview"}>
          <div className="w-96 h-56 bg-gray-300 rounded-lg text-center py-20 mx-10 my-5 text-2xl font-bold cursor-pointer">
            Dashboard Overview
          </div>
        </Link>
        <Link to={"/totalAssignments"}>
          <div className="w-96 h-56 bg-gray-300 rounded-lg text-center py-20 mx-10 my-5 text-2xl font-bold cursor-pointer">
            Assignment overview
          </div>
        </Link>
        <Link to={"/feedbackAndScore"}>
          <div className="w-96 h-56 bg-gray-300 rounded-lg text-center py-20 mx-10 my-5 text-2xl font-bold cursor-pointer">
            Feedback & Score
          </div>
        </Link>
        <Link to={"/plagiarismCheckResults"}>
          <div className="w-96 h-56 bg-gray-300 rounded-lg text-center py-20 mx-10 my-5 text-2xl font-bold cursor-pointer">
            plagarism Check Results
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Students;
