import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useAppDispatch } from "./store/hooks";
import { fetchCurrentUser } from "./store/slices/authSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <Routes>
      <Route index path={"/"} element={<Home />} />
      <Route path={"/auth"} element={<Auth />} />
      
    </Routes>
  );
};

export default App;
