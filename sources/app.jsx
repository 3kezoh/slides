import React, { useContext, useEffect } from "react";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Menu from "./components/Menu";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Workspace from "../pages/Workspace";
import { UserContext } from "./context/UserContext";

const App = () => {
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser && location.pathname!== "/register" && location.pathname!== "/login") {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <Menu />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {currentUser && (
          <>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/workspace" element={<Workspace />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
