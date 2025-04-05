import React from "react";
import { Link } from "react-router";

const Students = () => {
  return (
    <div>
      <div className="mx-2 my-6 md:my-32 flex flex-wrap justify-center gap-6 sm:mx-6 lg:mx-20">
        <Link to={"/dashboardOverview"}>
          <div className="w-72 sm:w-80 md:w-96 md:mx-6 h-56 bg-gray-300 rounded-lg text-center flex items-center justify-center text-xl sm:text-2xl font-bold cursor-pointer">
            Dashboard Overview
          </div>
        </Link>
        <Link to={"/totalAssignments"}>
          <div className="w-72 sm:w-80 md:w-96 md:mx-6 h-56 bg-gray-300 rounded-lg text-center flex items-center justify-center text-xl sm:text-2xl font-bold cursor-pointer">
            Assignment Overview
          </div>
        </Link>
        <Link to={"/feedbackAndScore"}>
          <div className="w-72 sm:w-80 md:w-96 md:mx-6 h-56 bg-gray-300 rounded-lg text-center flex items-center justify-center text-xl sm:text-2xl font-bold cursor-pointer">
            Feedback & Score
          </div>
        </Link>
        {/*
        <Link to={"/plagiarismCheckResults"}>
          <div className="w-96 h-56 bg-gray-300 rounded-lg text-center py-20 mx-10 my-5 text-2xl font-bold cursor-pointer">
            Plagiarism Check Results
          </div>
        </Link>
        */}
      </div>
    </div>
  );
};

export default Students;
