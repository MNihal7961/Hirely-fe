import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "motion/react";
import { BsCoin, BsRobot } from "react-icons/bs";
import { FaUserAstronaut } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import authService from "../services/auth.service";
import { clearUser } from "../store/slices/authSlice";
import AuthModal from "./AuthModal";

const Navbar: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const [showCreditPopup, setShowCreditPopup] = useState<boolean>(false);
  const [showUserPopup, setShowUserPopup] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  const handleLogout = async () => {
    const logoutResponse = await authService.signOut();
    if (logoutResponse) {
      dispatch(clearUser());
      setShowUserPopup(false);
      setShowCreditPopup(false);
    }
  };

  const handleCreditClick = () => {
    if(!user){
      setShowAuthModal(true);
      return;
    }
    setShowCreditPopup(!showCreditPopup);
    setShowUserPopup(false);
  };

  const handleUserClick = () => {
    setShowUserPopup(!showUserPopup);
    setShowCreditPopup(false);
  };

  const handleAuthClick = () => {
    setShowAuthModal(!showAuthModal);
    setShowUserPopup(false);
    setShowCreditPopup(false);
  };

  return (
    <div className="bg-[#f3f3f3] flex justify-center px-4 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center relative"
      >
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="bg-black text-white p-2 rounded-lg">
            <BsRobot size={18} />
          </div>
          <h1 className="font-semibold hidden md:block text-lg">Hirely.ai</h1>
        </div>
        <div className="flex items-center gap-6 relative">
          <div className="relative">
            <button
              onClick={handleCreditClick}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition"
            >
              <BsCoin size={20} />
              {user?.credits || 0}
            </button>
            {showCreditPopup && (
              <div className="absolute r mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50">
                <p className="text-sm text-gray-600 mb-4">
                  Need more credits to continue interviews?
                </p>
                <button className="w-full bg-black text-white py-2 rounded-lg text-sm">
                  Buy more credits
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={handleUserClick}
              className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold"
            >
              {user ? (
                user.name.charAt(0).toUpperCase()
              ) : (
                <FaUserAstronaut size={16} />
              )}
            </button>
            {showUserPopup && (
              <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50">
                <p className="text-md text-blue-500 font-medium mb-1">
                  {user?.name}
                </p>
                <button className="w-full text-left text-sm py-2 hover:text-black text-gray-600">
                  Interview History
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-sm py-2 flex items-center gap-2 text-red-500"
                >
                  <HiOutlineLogout size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      {showAuthModal && <AuthModal onClose={handleAuthClick} />}
    </div>
  );
};

export default Navbar;
