import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BASE_URL } from "../utils/constants";

const StudentFeedback = ({ studentId }) => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null); // Track expanded feedback

  useEffect(() => {
    const fetchFeedbackAndQuestions = async () => {
      try {
        // Fetch feedback data
        const feedbackResponse = await axios.get(
          BASE_URL + `/api/feedback/student/${studentId}`
        );
        const feedback = feedbackResponse.data;

        // Fetch all assignment questions concurrently
        const questionsResponses = await Promise.all(
          feedback.map((fb) =>
            axios.get(BASE_URL + `/api/feedback/assignments/${fb.assignmentId}`)
          )
        );

        // Extract data from each response
        const questionsData = questionsResponses.map(
          (response) => response.data
        );

        // Combine questions with their corresponding feedback
        const combinedData = feedback.map((fb, index) => ({
          questionText: questionsData[index].title,
          feedback: fb,
        }));

        setFeedbackData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackAndQuestions();
  }, [studentId]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (loading) return <p>Loading feedback...</p>;
  if (feedbackData.length === 0) return <p>No feedback found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Assignment Feedback
      </h2>

      {feedbackData.map((item, index) => {
        const isExpanded = expandedIndex === index;
        const evaluationScores = [
          {
            name: "Completeness",
            score: parseFloat(item.feedback.completeness),
          },
          { name: "Accuracy", score: parseFloat(item.feedback.accuracy) },
          {
            name: "Instruction Following",
            score: parseFloat(item.feedback.instructionFollowing),
          },
          { name: "Creativity", score: parseFloat(item.feedback.creativity) },
          {
            name: "Writing Quality",
            score: parseFloat(item.feedback.writingQuality),
          },
          { name: "Reasoning", score: parseFloat(item.feedback.reasoning) },
        ];

        return (
          <div
            key={item.feedback._id}
            className="mb-6 p-4 bg-gray-100 rounded-lg"
          >
            <div className="cursor-pointer" onClick={() => toggleExpand(index)}>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Question {index + 1}
              </h3>
              <p className="text-gray-800 mb-2 font-bold">
                {item.questionText}
              </p>
            </div>

            {isExpanded && (
              <div>
                {/* Bar Chart Visualization */}
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={evaluationScores}>
                      <XAxis dataKey="name" stroke="#555" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar
                        dataKey="score"
                        fill="#4F46E5"
                        barSize={40}
                        radius={[10, 10, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <h3 className="font-semibold mt-4">Feedback:</h3>
                <p className="text-gray-600 italic">{item.feedback.feedback}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StudentFeedback;
