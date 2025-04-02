import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as BarTooltip,
  Legend,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Tooltip as RadialTooltip,
} from "recharts";
import { BASE_URL } from "../utils/constants";

const PerformanceGraph = ({ studentId }) => {
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL + 
          `/api/performance/student/${studentId}`
        );
        setPerformanceData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };
    fetchData();
  }, [studentId]);

  if (!performanceData) return <p>Loading...</p>;

  // Provide defaults (0) if any parameter is undefined
  const avgAccuracy = Number(performanceData.avgAccuracy) || 0;
  const avgCompleteness = Number(performanceData.avgCompleteness) || 0;
  const avgCreativity = Number(performanceData.avgCreativity) || 0;
  const avgReasoning = Number(performanceData.avgReasoning) || 0;
  const avgWritingQuality = Number(performanceData.avgWritingQuality) || 0;
  const avgInstructionFollowing =
    Number(performanceData.avgInstructionFollowing) || 0;

  // Prepare data for bar chart
  const barData = [
    { parameter: "Accuracy", value: avgAccuracy },
    { parameter: "Completeness", value: avgCompleteness },
    { parameter: "Creativity", value: avgCreativity },
    { parameter: "Reasoning", value: avgReasoning },
    { parameter: "Writing Quality", value: avgWritingQuality },
    { parameter: "Instruction Following", value: avgInstructionFollowing },
  ];

  // Colors for donut charts
  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#8dd1e1",
    "#a4de6c",
  ];

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Performance Overview</h3>

      {/* Bar Chart for overall performance */}
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={barData}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="parameter" />
            <YAxis domain={[0, 100]} />
            <BarTooltip formatter={(value) => `${value.toFixed(2)}%`} />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Average Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Donut (Radial) Charts for each parameter */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Detailed Parameter Scores
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {barData.map((item, index) => (
            <div
              key={item.parameter}
              className="flex flex-col items-center justify-center border rounded p-4"
            >
              <h4 className="mb-2 font-semibold">{item.parameter}</h4>
              <RadialBarChart
                width={200}
                height={200}
                cx={100}
                cy={100}
                innerRadius={70}
                outerRadius={100}
                barSize={15}
                data={[item]} // single data point
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar
                  minAngle={15}
                  clockWise
                  dataKey="value"
                  fill={COLORS[index % COLORS.length]}
                  cornerRadius={10}
                />
                <text
                  x={100}
                  y={100}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-bold text-lg"
                >
                  {item.value.toFixed(2)}%
                </text>
                <RadialTooltip formatter={(value) => `${value.toFixed(2)}%`} />
              </RadialBarChart>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceGraph;
