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
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          BASE_URL + `/api/performance/student/${studentId}`
        );
        setPerformanceData(response.data);
      } catch (error) {
        console.error("Error fetching performance data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [studentId]);

  if (loading)
    return <h2 className="text-center text-lg font-semibold">Loading...</h2>;

  // Fallback to 0 if undefined
  const avgAccuracy = Number(performanceData?.avgAccuracy) || 0;
  const avgCompleteness = Number(performanceData?.avgCompleteness) || 0;
  const avgCreativity = Number(performanceData?.avgCreativity) || 0;
  const avgReasoning = Number(performanceData?.avgReasoning) || 0;
  const avgWritingQuality = Number(performanceData?.avgWritingQuality) || 0;
  const avgInstructionFollowing =
    Number(performanceData?.avgInstructionFollowing) || 0;

  const allZero =
    avgAccuracy === 0 &&
    avgCompleteness === 0 &&
    avgCreativity === 0 &&
    avgReasoning === 0 &&
    avgWritingQuality === 0 &&
    avgInstructionFollowing === 0;

  const barData = [
    { parameter: "Accuracy", value: avgAccuracy },
    { parameter: "Completeness", value: avgCompleteness },
    { parameter: "Creativity", value: avgCreativity },
    { parameter: "Reasoning", value: avgReasoning },
    { parameter: "Writing Quality", value: avgWritingQuality },
    { parameter: "Instruction Following", value: avgInstructionFollowing },
  ];

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

      {allZero && (
        <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 rounded border border-yellow-300">
          <p className="text-center font-medium">
            You have not submitted any assignment till now. <br />
            Submit the assignment for performance graph.
          </p>
        </div>
      )}

      {/* Bar Chart */}
      <div className="mb-8">
        <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="parameter"
                angle={isMobile ? -45 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                interval={0}
              />
              <YAxis domain={[0, 100]} />
              <BarTooltip formatter={(value) => `${value.toFixed(2)}%`} />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" name="Average Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radial Charts */}
      <div className="">
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
                data={[item]}
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
