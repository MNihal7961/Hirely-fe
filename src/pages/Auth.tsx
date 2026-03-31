import React from "react";
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { provider, auth } from "../utils/firebase";
import { signInWithPopup } from "@firebase/auth";
import authService from "../services/auth.service";
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

interface AuthProps {
  isModel?: boolean;
  onclose?: () => void;
}
const Auth: React.FC<AuthProps> = ({ isModel = false, onclose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const { displayName, email } = response.user;
      const authResponse = await authService.signInWithGoogle(
        email!,
        displayName!,
      );
      if (authResponse) {
        dispatch(setUser(authResponse?.user));
       if(isModel){
        onclose?.();
       }else{
         navigate("/");
       }
      } else {
        console.error("Google authentication failed: No response from server");
      }
    } catch (error) {
      console.error("Google authentication failed:", error);
    }
  };

  return (
    <div
      className={`w-full ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05 }}
        className={`w-full  ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-4xl"} bg-white shadow-2xl border border-gray-200`}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-black text-white p-2 rounded-lg">
            <BsRobot size={18} />
          </div>
          <h2 className="font-semibold text-lg">Hirely.ai</h2>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-center leading-snug mb-4">
          Continue with
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2">
            <IoSparkles size={16} /> AI Smart Interview
          </span>
        </h1>
        <p className="text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8">
          Sign in to start AI powered interview preparation and get personalized
          feedback to improve your performance.
        </p>
        <motion.button
          whileHover={{ opacity: 0.9, scale: 1.03 }}
          whileTap={{ opacity: 1, scale: 0.98 }}
          className="w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md"
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} />
          Continue with Google
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Auth;
