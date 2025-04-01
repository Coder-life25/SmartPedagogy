import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const AssignmentSubmission = () => {
  const { id: assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [createdBy, setCreatedBy] = useState("");
  const [file, setFile] = useState(null);
  const [base64File, setBase64File] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/assignments/${assignmentId}`,
          {
            withCredentials: true,
          }
        );
        setAssignment(response.data);
        setCreatedBy(response.data.createdBy);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching assignment", err);
        setError("Failed to load assignment.");
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [assignmentId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      alert("No file selected!");
      return;
    }

    const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only PDF, PNG, or JPEG files are allowed.");
      return;
    }

    setFile(selectedFile);

    // Convert file to Base64
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setBase64File(reader.result);
    };
    reader.onerror = (err) => {
      console.error("File reading error:", err);
      alert("Failed to read file.");
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !base64File) {
      alert("Please select a file to submit.");
      return;
    }

    const submissionData = {
      assignmentId,
      createdBy,
      file: base64File, // Base64 string
    };

    try {
      // Step 1: Submit the assignment
      const uploadRes = await axios.post(
        `${BASE_URL}/api/submissions/upload`,
        submissionData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Assignment submitted:", uploadRes.data);
      alert("Assignment submitted successfully!");

      // Step 2: Get submissionId using assignmentId
      const submissionIdRes = await axios.get(
        `${BASE_URL}/api/submissions/getSubmissionId/${assignmentId}`,
        { withCredentials: true }
      );

      const submissionId = submissionIdRes.data.submissionId;
      console.log("Retrieved Submission ID:", submissionId);

      if (!submissionId) {
        alert("Failed to retrieve submission ID.");
        return;
      }

      // Step 3: Analyze the assignment
      const analyzeRes = await axios.post(
        `${BASE_URL}/api/check/analyze/assignment`,
        { submissionId },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Assignment analysis response:", analyzeRes.data);
      alert("Assignment analyzed successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!assignment) return <p>Assignment not found</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto border rounded-lg shadow-lg my-5">
      <h2 className="text-2xl font-semibold">{assignment.title}</h2>
      <p className="text-gray-700">{assignment.description}</p>
      <p className="text-red-500">
        Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
      </p>

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="mb-2"
        />
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
