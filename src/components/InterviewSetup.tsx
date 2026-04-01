import React, { useState } from "react";
import { motion } from "motion/react";
import {
  FaBriefcase,
  FaChartLine,
  FaFileUpload,
  FaMicrophoneAlt,
  FaUserTie,
} from "react-icons/fa";
import type { AnalyzedResume } from "../types";
import interviewService from "../services/interview.service";

const steps = [
  {
    text: "Choose Role and Experience",
    icon: <FaUserTie className="text-green-600 text-xl" />,
  },
  {
    text: "Smart Voice Interview",
    icon: <FaMicrophoneAlt className="text-green-600 text-xl" />,
  },
  {
    text: "Performance Analysis",
    icon: <FaChartLine className="text-green-600 text-xl" />,
  },
];

interface InterviewSetupProps {
  onStartInterview: (interviewData: any) => void;
}

const InterviewSetup: React.FC<InterviewSetupProps> = ({
  onStartInterview,
}) => {
  const [role, setRole] = useState<string | null>(null);
  const [experience, setExperience] = useState<string | null>(null);
  const [mode, setMode] = useState<"Technical" | "HR">("Technical");
  const [loading, setLoading] = useState<boolean>(false);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [analzingDone, setAnalyzingDone] = useState<boolean>(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [parsedResume, setParsedResume] = useState<AnalyzedResume | null>(null);

  const handleUploadAndAnalyzeResume = async () => {
    if (!resumeFile || analyzing) {
      return;
    }
    setAnalyzing(true);
    const analyzeResonse = await interviewService.analyzeResume(resumeFile);
    if (analyzeResonse) {
      setRole(analyzeResonse.role);
      setExperience(analyzeResonse.experience);
      setParsedResume(analyzeResonse);
      setAnalyzingDone(true);
    }
    setAnalyzing(false);
  };

  const handleStartInterview = async () => {
    if (!parsedResume) {
      return;
    }
    setLoading(true);
    const startResponse = await interviewService.startInterview(
      parsedResume.role,
      parsedResume.experience,
      mode,
      parsedResume.resumeText,
      parsedResume.projects,
      parsedResume.skills,
    );
    if (startResponse) {
      onStartInterview(startResponse);
    }
    setLoading(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-4"
    >
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative bg-linear-to-br from-green-50 to-green-100 p-12 flex flex-col justify-center"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Start Your AI Interview
          </h2>
          <p className="text-gray-600 mb-10">
            Practice real interview scenarios powered by AI. Get instant
            feedback and improve your skills with personalized coaching.
          </p>

          <div className="space-y-5">
            {steps.map((step, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.2 }}
                whileHover={{ scale: 1.03 }}
                key={index}
                className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm cursor-pointer"
              >
                {step.icon}
                <span className="text-gray-700 font-medium">{step.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="p-12 bg-white"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Interview Setup
          </h2>

          <div className="space-y-6">
            <div className="relative">
              <FaUserTie className="absolute top-4 left-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter role"
                name="role"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all duration-200"
                onChange={(e) => setRole(e.target.value)}
                value={role ? role : undefined}
              />
            </div>
            <div className="relative">
              <FaBriefcase className="absolute top-4 left-4 text-gray-400" />
              <input
                type="text"
                placeholder="Experience (e.g. 3 years)"
                name="experience"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all duration-200"
                onChange={(e) => setExperience(e.target.value)}
                value={experience ? experience : undefined}
              />
            </div>
            <select
              name="mode"
              id="mode"
              className="w-full py-3 px-4 border border-gray-200 rounded-xl focus:ring-green-500 outline-none transition-all duration-200"
              onChange={(e) => setMode(e.target.value as "HR" | "Technical")}
            >
              <option value="Technical">Technical Interview</option>
              <option value="HR">HR Interview</option>
            </select>

            {!analzingDone && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => document.getElementById("resumeUpload")?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all"
              >
                <FaFileUpload className="text-4xl mx-auto text-green-600 mb-3" />
                <input
                  type="file"
                  accept="application/pdf"
                  id="resumeUpload"
                  className="hidden"
                  multiple={false}
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setResumeFile(e.target.files[0]);
                    }
                  }}
                />
                <p className="text-gray-600 font-medium">
                  {resumeFile ? resumeFile?.name : "Click to upload resume"}
                </p>

                {resumeFile && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="mt-4 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                    disabled={analyzing}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadAndAnalyzeResume();
                    }}
                  >
                    {analyzing ? "Analyzing..." : "Analyze Resume"}
                  </motion.button>
                )}
              </motion.div>
            )}

            {analzingDone && parsedResume && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gra-50 border-gray-200 rounded-xl p-5 space-y-5"
              >
                <h3 className="font-semibold text-gray-800 text-lg">
                  Resume Analysis Result
                </h3>

                {parsedResume.projects.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Projects:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {parsedResume.projects.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {parsedResume.skills.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-700 mb-1">Skills:</p>
                    <ul className="flex flex-wrap gap-2">
                      {parsedResume.skills.slice(0, 9).map((s, i) => (
                        <li
                          key={i}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                        >
                          {s}
                        </li>
                      ))}

                      {parsedResume.skills.length > 10 && (
                        <li className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          +{parsedResume.skills.length - 9} more
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              disabled={!parsedResume || loading}
              onClick={handleStartInterview}
              className="cursor-pointer disabled:cursor-not-allowed w-full disabled:bg-gray-600 bg-green-600 hover:bg-green-700 text-white py-3 rounded-3xl text-lg font-semibold shadow-md transition duration-300"
            >
              {loading ? "Starting..." : " Start Interview"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InterviewSetup;
