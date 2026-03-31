import React from "react";

interface InterviewScreenProps {
  interviewData: any;
  onFinishInterview: (report:any) => void;
}

const InterviewScreen: React.FC<InterviewScreenProps> = ({
  interviewData,
  onFinishInterview,
}) => {
  return <div>InterviewScreen</div>;
};

export default InterviewScreen;
