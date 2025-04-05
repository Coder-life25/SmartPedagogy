import React from "react";
import PerformanceGraph from "../../components/PerformanceGraph";
import { useSelector } from "react-redux";

const DashboardOverview = () => {
  const user = useSelector((store) => store.user);

  if (!user) return;

  return (
    <div>
      <PerformanceGraph studentId={user._id || user.id} />
    </div>
  );
};

export default DashboardOverview;
