import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const AssignmentSection = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Introduction to AI",
      description: "Basics of AI and ML",
      dueDate: "2025-04-15",
    },
    {
      id: 2,
      title: "Introduction to AI",
      description: "Basics of AI and ML",
      dueDate: "2025-04-15",
    },
    {
      id: 3,
      title: "Introduction to AI",
      description: "Basics of AI and ML",
      dueDate: "2025-04-15",
    },
  ]);
  const [newAssignment, setNewAssignment] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get( BASE_URL + "/api/assignments", {withCredentials:true});
      // setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments", error);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post("/api/assignments", { title: newAssignment });
      setNewAssignment("");
      fetchAssignments();
    } catch (error) {
      console.error("Error creating assignment", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/assignments/${id}`);
      fetchAssignments();
    } catch (error) {
      console.error("Error deleting assignment", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Assignment Management</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newAssignment}
          onChange={(e) => setNewAssignment(e.target.value)}
          placeholder="Enter assignment title"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Assignment
        </button>
      </div>
      <ul className="space-y-2">
        {assignments.map((assignment) => (
          <li
            key={assignment._id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span>{assignment.title}</span>
            <button
              onClick={() => handleDelete(assignment._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentSection;
