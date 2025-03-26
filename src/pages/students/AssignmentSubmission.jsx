import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const AssignmentSubmission = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/assignments/${id}`, {
          withCredentials: true,
        });
        setAssignment(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching assignment", error);
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to submit.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("assignmentId", id);

    try {
      await axios.post(`${BASE_URL}/api/submissions`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Assignment submitted successfully!");
    } catch (error) {
      console.error("Error submitting assignment", error);
      alert("Failed to submit assignment");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!assignment) return <p>Assignment not found</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto border rounded-lg shadow-lg my-5">
      <h2 className="text-2xl font-semibold">{assignment.title}</h2>
      <p className="text-gray-700">{assignment.description}</p>
      <p className="text-red-500">Due Date: {assignment.dueDate}</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Assignment
        </button>
      </form>
    </div>
  );
};

export default AssignmentSubmission;
