import React from "react";
import StudentFeedback from "../../components/StudentFeedback";
import { useSelector } from "react-redux";

const FeedbackAndScore = () => {
  const user = useSelector((store) => store.user);
  if (!user) return;

  return (
    <div>
      <StudentFeedback studentId={user._id} />
    </div>
  );
};

export default FeedbackAndScore;
