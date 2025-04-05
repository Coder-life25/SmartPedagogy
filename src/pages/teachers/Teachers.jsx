import React from "react";
import { Link } from "react-router";

const Teachers = () => {
  return (
    <div className="px-4 py-8">
      <div className="flex flex-wrap justify-center gap-6">
        <Link to={"/classroomOverview"}>
          <div className="w-72 sm:w-80 md:w-96 md:mx-10 h-56 bg-gray-300 rounded-lg text-center flex items-center justify-center text-xl sm:text-2xl font-bold cursor-pointer">
            Classroom Overview
          </div>
        </Link>

        <Link to={"/assignmentSection"}>
          <div className="w-72 sm:w-80 md:w-96 md:mx-10 h-56 bg-gray-300 rounded-lg text-center flex items-center justify-center text-xl sm:text-2xl font-bold cursor-pointer">
            Assignment Section
          </div>
        </Link>

        <Link to={"/feedbackInsights"}>
          <div className="w-72 sm:w-80 md:w-96 md:mx-10 h-56 bg-gray-300 rounded-lg text-center flex items-center justify-center text-xl sm:text-2xl font-bold cursor-pointer">
            Feedback Insights
          </div>
        </Link>

        {/* Uncomment this block if you want to use it */}
        {/* <Link to={"/plagiarismIntegrityReport"}>
          <div className="w-full sm:w-72 md:w-80 lg:w-96 h-56 bg-gray-300 rounded-lg text-center flex items-center justify-center text-xl sm:text-2xl font-bold cursor-pointer">
            Plagiarism Integrity Report
          </div>
        </Link> */}
      </div>
    </div>
  );
};

export default Teachers;
