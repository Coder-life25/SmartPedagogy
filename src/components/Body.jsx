import React from "react";
import { Link } from "react-router";
const Body = () => {
  return (
    <div className="mx-10 my-10 flex ">
      <Link to={"/classroomOverview"}>
        <div className="w-96 h-56 bg-gray-300 rounded-lg text-center py-20 mx-10 my-5 text-2xl font-bold cursor-pointer">
          Classroom Overview
        </div>
      </Link>
      <Link to={"/assignmentSection"}>
        <div className="w-96 h-56 bg-gray-300 rounded-lg text-center py-20 mx-10 my-5 text-2xl font-bold cursor-pointer">
          Assignment Section
        </div>
      </Link>
      <Link to={"/feedbackInsights"}>
        <div className="w-96 h-56 bg-gray-300 rounded-lg text-center py-20 mx-10 my-5 text-2xl font-bold cursor-pointer">
          Feedback Insights
        </div>
      </Link>
      <Link to={"/classroomOverview"}> 
        <div className="w-96 h-56 bg-gray-300 rounded-lg text-center py-20 mx-10 my-5 text-2xl font-bold cursor-pointer">
          plagarism Integrity Reports
        </div>
      </Link>
    </div>
  );
};

export default Body;
