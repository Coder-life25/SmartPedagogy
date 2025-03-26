import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { Link } from "react-router";

const TotalAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(BASE_URL + "/api/assignments/students", {
        withCredentials: true,
      });
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto cursor-pointer">
      <h2 className="text-2xl font-semibold mb-4">Assignment Submission</h2>
      <ul className="space-y-2">
        {assignments.map((assignment) => (
          <li key={assignment._id} className="border p-3 rounded">
            <h3 className="font-bold">{assignment.title}</h3>
            <p>{assignment.description}</p>
            <p className="text-sm text-gray-500">
              Due Date: {new Date(assignment.dueDate).toDateString()}
            </p>
            {/* Submission Button will be added here */}
            <Link to={`/assignment/${assignment._id}`}>
              <button className="my-2 cursor-pointer bg-gray-400 text-white rounded-lg px-4 py-2">
                click here to submit{" "}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TotalAssignments;
