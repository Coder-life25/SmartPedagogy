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
    const mimeMatch = base64String.match(/^data:(.*?);base64,/);
    if (!mimeMatch) {
      console.error("Invalid Base64 format.");
      return;
    }

    const mimeType = mimeMatch[1];
    const base64Content = base64String.replace(/^data:.*?;base64,/, "");

    try {
      const byteCharacters = atob(base64Content);
      const byteNumbers = new Uint8Array(byteCharacters.length).map((_, i) =>
        byteCharacters.charCodeAt(i)
      );
      const fileBlob = new Blob([byteNumbers], { type: mimeType });
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
    <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-6">
      <h2 className="text-xl font-semibold mb-5">
        Class Overview-Submitted Assignments
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Student Name</th>
              <th className="border p-2">Assignment Title</th>
              <th className="border p-2">Submission Date</th>
              <th className="border p-2">View File</th>
            </tr>
          </thead>
          <tbody>
            {submittedAssignments.map((submission) => (
              <tr key={submission._id} className="border">
                <td className="border p-2">{submission.studentId.name}</td>
                <td className="border p-2">{submission.assignmentId.title}</td>
                <td className="border p-2">
                  {new Date(submission.submittedAt).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => openFileInNewTab(submission)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition duration-200"
                  >
                    View File
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassOverview;
