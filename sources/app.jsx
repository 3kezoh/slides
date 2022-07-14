import React from "react";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { auth } from "./components/firebase";
import {
  Route,
  Routes,
  Link,
} from "react-router-dom";

const App = () => {
  const logout = () => {
    auth.signOut();
  };

  return (
    <>
      <Link to="/login">Login</Link>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
