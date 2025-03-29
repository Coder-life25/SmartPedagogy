import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment } from "../../utils/allAssignmentSlice";
import { addSubmittedAssignment } from "../../utils/submittedAssignmentSlice";
import { addPendingAssignment } from "../../utils/pendingAssignmentSlice";

const TotalAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const [showSubmittedAssignments, setShowSubmittedAssignments] =
    useState(true);
  const [showPendingAssignments, setShowPendingAssignments] = useState(false);

  const dispatch = useDispatch();
  const allAssignment = useSelector((store) => store.allAssignment);
  console.log(allAssignment);
  const pendingAssignment = useSelector((store) => store.pendingAssignment);
  console.log(pendingAssignment);
  const submittedAssignment = useSelector((store) => store.submittedAssignment);
  console.log(submittedAssignment);

  useEffect(() => {
    fetchAssignments();
    fetchSubmittedAssignments();
    fetchPendingAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(BASE_URL + "/api/assignments/students", {
        withCredentials: true,
      });
      setAssignments(response.data);
      dispatch(addAssignment(response.data));
    } catch (error) {
      console.error("Error fetching assignments", error);
    }
  };

  const fetchSubmittedAssignments = async () => {
    try {
      const response = await axios.get(
        BASE_URL + "/api/submissions/submitted",
        {
          withCredentials: true,
        }
      );
      setSubmittedAssignments(response.data);
      dispatch(addSubmittedAssignment(response.data));
    } catch (error) {
      console.error("Error fetching submitted assignments", error);
    }
  };

  const fetchPendingAssignments = async () => {
    try {
      const response = await axios.get(BASE_URL + "/api/submissions/pending", {
        withCredentials: true,
      });
      setPendingAssignments(response.data);
      dispatch(addPendingAssignment(response.data));
    } catch (error) {
      console.error("Error fetching submitted assignments", error);
    }
  };

  return (
    <div className="flex justify-between p-6 max-w-full mx-36">
      {/* Left Section - All Assignments */}
      <div className="w-1/3 pr-4">
        <h2 className="text-2xl font-semibold mb-4">All Assignments</h2>
        <ul className="space-y-2">
          {assignments.map((assignment) => (
            <li key={assignment._id} className="border p-3 rounded">
              <h3 className="font-bold">{assignment.title}</h3>
              <p>{assignment.description}</p>
              <p className="text-sm text-gray-500">
                Due Date: {new Date(assignment.dueDate).toDateString()}
              </p>
              <Link to={`/assignment/${assignment._id}`}>
                <button className="my-2 cursor-pointer bg-gray-400 text-white rounded-lg px-4 py-2">
                  Click here to submit
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section - Submitted & Pending Assignments */}
      <div className="w-3/5 pl-4">
        <h2 className="text-2xl font-semibold mb-4">Your Assignments</h2>
        <div className="">
          <div>
            <h3
              className="font-bold text-green-600 cursor-pointer"
              onClick={() => {
                setShowSubmittedAssignments(!showSubmittedAssignments);
              }}
            >
              Submitted Assignments
            </h3>
            {showSubmittedAssignments && (
              <ul className="space-y-2 w-1/2">
                {submittedAssignments.map((assignment) => (
                  <li
                    key={assignment.assignmentId}
                    className="border p-3 rounded bg-green-100"
                  >
                    <h3>{assignment.title}</h3>
                    <p>
                      Submitted on:{" "}
                      {new Date(assignment.createdAt).toDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-4">
            <h3
              className="font-bold text-red-600 cursor-pointer"
              onClick={() => {
                setShowPendingAssignments(!showPendingAssignments);
              }}
            >
              Pending Assignments
            </h3>
            {showPendingAssignments && (
              <ul className="space-y-2 w-1/2">
                {pendingAssignments.map((assignment) => (
                  <li
                    key={assignment._id}
                    className="border p-3 rounded bg-red-100"
                  >
                    <h3>{assignment.title}</h3>
                    <p>
                      Due Date: {new Date(assignment.dueDate).toDateString()}
                    </p>
                    <Link to={`/assignment/${assignment._id}`}>
                      <button className="my-2 cursor-pointer bg-blue-500 text-white rounded-lg px-4 py-2">
                        Submit Now
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalAssignments;
