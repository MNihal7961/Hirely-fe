import React from 'react'

interface InterviewSetupProps {
    onStartInterview: (interviewData: any) => void;
}

const InterviewSetup: React.FC<InterviewSetupProps> = ({ onStartInterview }) => {
  return (
    <div>InterviewSetup</div>
  )
}

export default InterviewSetup