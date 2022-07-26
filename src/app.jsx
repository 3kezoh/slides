import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Menu from "./components/Menu";
import { UserContext } from "./context/UserContext";
import Login from "./pages/Login";
import Preview from "./pages/Preview";
import Room from "./pages/Room";
import Workspace from "./pages/Workspace";

function App() {
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser && location.pathname !== "/login") {
      navigate("/login");
    } else if (location.pathname == "/login" && currentUser) {
      navigate("/workspace");
    }
  }, [currentUser, navigate, location]);

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
}

export default App;
