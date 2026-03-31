import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useAppDispatch } from "./store/hooks";
import { fetchCurrentUser } from "./store/slices/authSlice";
import Interview from "./pages/Interview";
import History from "./pages/History";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <Routes>
      <Route index path={"/"} element={<Home />} />
      <Route path={"/auth"} element={<Auth />} />
      <Route path={"/interview"} element={<Interview />} />
      <Route path={"/history"} element={<History />} />
    </Routes>
  );
};

export default App;
