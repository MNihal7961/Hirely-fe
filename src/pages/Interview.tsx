import React, { useState } from "react";
import InterviewSetup from "../components/InterviewSetup";
import InterviewScreen from "../components/InterviewScreen";
import InterviewReport from "../components/InterviewReport";

const Interview: React.FC = () => {
  const [step, setStep] = useState<"setup" | "interview" | "report">("setup");
  const [interviewData, setInterviewData] = useState<any>(null);
  const [reportData, setReportData] = useState<any>(null);

  const handleSetup = (interviewData:any) => {
    setInterviewData(interviewData);
    setStep("interview");
  };

  const handleCompleteInterview = (report:any) => {
    setReportData(report);
    setStep("report");
  };

  const getContentBasedOnStep = () => {
    switch (step) {
      case "setup":
        return <InterviewSetup onStartInterview={handleSetup} />;
      case "interview":
        return (
          <InterviewScreen
            onFinishInterview={handleCompleteInterview}
            interviewData={interviewData}
          />
        );
      case "report":
        return <InterviewReport report={reportData} />;
      default:
        return null;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">{getContentBasedOnStep()}</div>
  );
};

export default Interview;
