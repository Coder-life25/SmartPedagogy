import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const AssignmentSection = () => {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(BASE_URL + "/api/assignments", {
        withCredentials: true,
      });
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleCreate = async () => {
    try {
      await axios.post(
        BASE_URL + "/api/assignments",
        { title, description, dueDate },
        { withCredentials: true }
      );
      setTitle("");
      setDescription("");
      setDueDate("");
      fetchAssignments();
    } catch (error) {
      console.error("Error creating assignment", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(BASE_URL + `/api/assignments/${id}`, {
        withCredentials: true,
      });
      fetchAssignments();
    } catch (error) {
      console.error("Error deleting assignment", error);
    }
  };

  // const handleEdit = async (id) => {
  //   try {
  //     const newTitle = prompt("Enter new title:");
  //     const newDescription = prompt("Enter new description:");
  //     const newDueDate = prompt("Enter new due date (YYYY-MM-DD):");

  //     if (!newTitle || !newDescription || !newDueDate) return;

  //     await axios.put(
  //       BASE_URL + `/api/assignments/${id}`,
  //       { title: newTitle, description: newDescription, dueDate: newDueDate },
  //       { withCredentials: true }
  //     );
  //     fetchAssignments();
  //   } catch (err) {
  //     console.log("Error updating assignment", err.message);
  //   }
  // };

  return (
    <div className="p-6 max-w-4xl mx-auto ">
      <h2 className="text-2xl font-semibold mb-4">Assignment Management</h2>
      <div className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter assignment title"
          className="border p-2 rounded w-full"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter assignment description"
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
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
            <div>
              {/* <button
                onClick={() => handleEdit(assignment._id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button> */}
              <button
                onClick={() => handleDelete(assignment._id)}
                className="bg-red-500 text-white px-3 py-1 rounded mx-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentSection;
