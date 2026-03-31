import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { HiSparkles } from "react-icons/hi";
import { motion } from "motion/react";
import AuthModal from "../components/AuthModal";
import { useNavigate } from "react-router-dom";
import {
  BsBarChart,
  BsClock,
  BsFileEarmarkText,
  BsMic,
  BsRobot,
} from "react-icons/bs";
import Footer from "../components/Footer";

const steps = [
  {
    icon: <BsRobot size={24} />,
    step: "STEP 1",
    title: "Choose Your Role",
    description: "Hirely.ai adjusts difficulty based on selected role.",
  },
  {
    icon: <BsMic size={24} />,
    step: "STEP 2",
    title: "Smart Voice Interview",
    description: "Dynamic follow-up questions based on your responses.",
  },
  {
    icon: <BsClock size={24} />,
    step: "STEP 3",
    title: "Timer Based Sessions",
    description: "Real interview pressure with time constraints.",
  },
];

const features = [
  {
    title: "AI Answer Analysis",
    description: "Scores communication, technical accuracy and confidence.",
    icon: <BsBarChart size={20} />,
    image: "/images/img1.png",
  },
  {
    title: "Resume Based Interview",
    description:
      "Project and experience based questions for personalized practice.",
    icon: <BsFileEarmarkText size={20} />,
    image: "/images/resume.png",
  },
  {
    title: "Downloadable Feedback Report",
    description: "Scores communication, technical accuracy and confidence.",
    icon: <BsFileEarmarkText size={20} />,
    image: "/images/pdf.png",
  },
  {
    title: "History & Analytics",
    description: "Track your progress and performance over time.",
    icon: <BsFileEarmarkText size={20} />,
    image: "/images/history.png",
  },
];

const interviewModes = [
  {
    title: "HR Interview",
    description:
      "Behavioral, communication and situational judgment questions.",
    image: "/images/HR.png",
  },
  {
    title: "Technical Interview",
    description:
      "Project and experience based questions for personalized practice.",
    image: "/images/tech.png",
  },
  {
    title: "Confidence Detection",
    description: "Basic tone and voice analysis.",
    image: "/images/confi.png",
  },
  {
    title: "Credits System",
    description: "Unlock premium features with our credit system.",
    image: "/images/credit.png",
  },
];

const Home: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleStartClick = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    navigate("/interview");
  };

  const handleHistoryClick = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    navigate("/history");
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <Navbar />
      <div className="flex-1 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full flex items-center gap-2">
              <HiSparkles size={16} className="bg-green-50 text-green-600" />
              AI powered smart interview platform
            </div>
          </div>
          <div className="text-center mb-28">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto"
            >
              Practice Interviews with
              <span className="relative inline-block">
                <span className="bg-green-100 text-green-600 px-5 py-1 rounded-full">
                  AI Intelligence
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg"
            >
              Role based mock interviews with smart follow-ups, adaptive
              difficulty, and personalized feedback to help you ace your next
              interview.
            </motion.p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <motion.button
                whileHover={{ opacity: 0.9, scale: 0.98 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                onClick={handleStartClick}
                className="bg-black text-white px-10 py-3 rounded-full hover:opacity-90 transition shadow-md"
              >
                Start Interview
              </motion.button>
              <motion.button
                whileHover={{ opacity: 0.9, scale: 0.98 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                onClick={handleHistoryClick}
                className="border border-gray-300 px-10 py-3 rounded-full hover:bg-gray-100 transition shadow-md"
              >
                View History
              </motion.button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-28">
            {steps.map((step, index) => (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 + index * 0.2 }}
                whileHover={{ rotate: 0, scale: 1.06 }}
                className={`relative bg-white rounded-3xl border-2 border-green-100 hover:border-green-500 p-10 w-80 max-w-[90%] shadow-md hover:shadow-2xl transition-all duration-300
                ${index === 0 && "rotate-[-4deg]"}
                ${index === 1 && "rotate-3 md:-mt-6 shadow-xl"}
                ${index === 2 && "-rotate-3"}
                `}
                key={index}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-green-500 text-green-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                  {step.icon}
                </div>
                <div className="pt-10 text-center">
                  <div className="text-xs text-green-600 font-semibold mb-2 tracking-wider">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-3 text-lg">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mb-32">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-semibold text-center mb-16"
            >
              Advanced AI <span className="text-green-600">Capabilities</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2 flex justify-center">
                      <img
                        className="w-full h-auto object-contain max-h-64"
                        src={feature.image}
                        alt={feature.title}
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <div className="bg-gray-50 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold mb-3 text-xl">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-32">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-semibold text-center mb-16"
            >
              Multiple Interview <span className="text-green-600">Modes</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-10">
              {interviewModes.map((mode, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="w-1/2">
                      <h3 className="font-semibold text-xl mb-3">
                        {mode.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {mode.description}
                      </p>
                    </div>
                    <div className="w-1/2 flex justify-end">
                      <img
                        className="w-28 h-28 object-contain"
                        src={mode.image}
                        alt={mode.title}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      <Footer/>
    </div>
  );
};

export default Home;
