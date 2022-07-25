import React, { useContext, useEffect } from "react";
import Login from "../pages/Login";
import Room from "../pages/Room";
import Menu from "./components/Menu";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Workspace from "../pages/Workspace";
import { UserContext } from "./context/UserContext";
import Preview from "../pages/Preview";

const App = () => {
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser && location.pathname !== "/login") {
      navigate("/login");
    } else if (location.pathname == "/login" && currentUser) {
      navigate("/workspace");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <Routes>
        <Route path="/preview/room/:roomId" element={<Preview />} />
      </Routes>
      <Menu />
      <Routes>
        <Route path="/login" element={<Login />} />
        {currentUser && (
          <>
            <Route path="/room/:roomId" element={<Room />} />
            <Route path="/workspace" element={<Workspace />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
