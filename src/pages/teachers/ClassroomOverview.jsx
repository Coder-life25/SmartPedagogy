import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const ClassOverview = () => {
  const [submittedAssignments, setSubmittedAssignments] = useState([]);

  useEffect(() => {
    fetchSubmittedAssignments();
  }, []);

  const fetchSubmittedAssignments = async () => {
    try {
      const response = await axios.get(BASE_URL + "/api/class/class-overview", {
        withCredentials: true,
      });
      setSubmittedAssignments(response.data);
    } catch (error) {
      console.error("Error fetching submitted assignments", error);
    }
  };

  const openFileInNewTab = (fileData) => {
    if (!fileData || !fileData.file) {
      console.error("File data is missing.");
      return;
    }

    const base64String = fileData.file;

    // Extract MIME type (e.g., "image/jpeg" or "application/pdf")
    const mimeMatch = base64String.match(/^data:(.*?);base64,/);
    if (!mimeMatch) {
      console.error("Invalid Base64 format.");
      return;
    }
    const mimeType = mimeMatch[1];

    // Remove metadata to get pure Base64 content
    const base64Content = base64String.replace(/^data:.*?;base64,/, "");

    try {
      // Convert Base64 to Blob
      const byteCharacters = atob(base64Content);
      const byteNumbers = new Uint8Array(byteCharacters.length).map((_, i) =>
        byteCharacters.charCodeAt(i)
      );
      const fileBlob = new Blob([byteNumbers], { type: mimeType });

      // Create a temporary URL and open it in a new tab
      const fileURL = URL.createObjectURL(fileBlob);
      const newTab = window.open(fileURL, "_blank");

      if (!newTab) {
        alert("Popup blocked! Allow popups and try again.");
      }
    } catch (error) {
      console.error("Error opening file:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Class Overview - Submitted Assignments
      </h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Student Name</th>
            <th className="border p-2">Assignment Title</th>
            <th className="border p-2">File Name</th>
            <th className="border p-2">Submission Date</th>
            <th className="border p-2">View File</th>
          </tr>
        </thead>
        <tbody>
          {submittedAssignments.map((submission) => (
            <tr key={submission._id} className="border">
              <td className="border p-2">{submission.studentId.name}</td>
              <td className="border p-2">{submission.assignmentId.title}</td>
              <td className="border p-2">{submission.fileName}</td>
              <td className="border p-2">
                {new Date(submission.submittedAt).toLocaleDateString()}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => openFileInNewTab(submission)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  View File
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassOverview;
