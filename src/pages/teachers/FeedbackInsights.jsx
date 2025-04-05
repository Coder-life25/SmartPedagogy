import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Bar, Radar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constants";

// Register Chart.js components
ChartJS.register(...registerables);

const FeedbackInsights = () => {
  const user = useSelector((store) => store.user);

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          BASE_URL + `/api/teacher/feedback-insights/${user.id}`
        );
        setAssignments(response.data.data.assignments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-8">
        Assignment Performance Dashboard
      </h1>

      {assignments.map((assignment) => (
        <div
          key={assignment.id}
          className="mb-8 bg-white rounded-lg shadow-lg p-6"
        >
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{assignment.title}</h2>
            <p className="text-gray-600">{assignment.description}</p>
            <div className="flex gap-4 mt-2">
              <span className="text-sm">
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </span>
              <span className="text-sm">
                Submissions: {assignment.submissionsCount}
              </span>
            </div>
          </div>

          {assignment.submissionsCount > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Overall Scores Radar Chart */}
              {assignment.avgScores && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">
                    Average Performance Metrics
                  </h3>
                  <Radar
                    data={{
                      labels: Object.keys(assignment.avgScores),
                      datasets: [
                        {
                          label: "Average Scores",
                          data: Object.values(assignment.avgScores).map(
                            (score) => parseFloat(score.replace("%", ""))
                          ),
                          backgroundColor: "rgba(79, 70, 229, 0.2)",
                          borderColor: "#4f46e5",
                          pointBackgroundColor: "#4f46e5",
                        },
                      ],
                    }}
                    options={{
                      scales: {
                        r: {
                          beginAtZero: true,
                          max: 100,
                          ticks: {
                            callback: (value) => value + "%",
                            stepSize: 20,
                          },
                        },
                      },
                    }}
                  />
                </div>
              )}

              {/* Student Performance Bar Chart */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-4">
                  Student Performance
                </h3>
                <Bar
                  data={{
                    labels: assignment.submissions.map(
                      (sub) => sub.studentName
                    ),
                    datasets: [
                      {
                        label: "Overall Score (%)",
                        data: assignment.submissions.map((sub) =>
                          sub.overallScore
                            ? parseFloat(sub.overallScore.replace("%", ""))
                            : 0
                        ),
                        backgroundColor: "#4f46e5",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                          callback: (value) => value + "%",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}

          {assignment.submissionsCount === 0 && (
            <div className="text-center py-4 text-gray-500">
              No submissions yet
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeedbackInsights;
