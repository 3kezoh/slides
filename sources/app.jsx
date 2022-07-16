import React from "react";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { auth } from "./components/firebase";
import { Route, Routes, Link } from "react-router-dom";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";

const App = () => {
  const logout = () => {
    auth.signOut();
  };

  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <button className="button signout" onClick={logout}>
            Sign out
          </button>
        </li>
      </ul>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

export default App;
