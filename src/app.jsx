import React, { useContext, useEffect, lazy, Suspense } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Menu from "./components/Menu";
import { UserContext } from "./context/UserContext";

const Login = lazy(() => import("./pages/Login"));
const Preview = lazy(() => import("./pages/Preview"));
const Room = lazy(() => import("./pages/Room"));
const Workspace = lazy(() => import("./pages/Workspace"));

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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          {currentUser && (
            <>
              <Route path="/room/:roomId" element={<Room />} />
              <Route path="/workspace" element={<Workspace />} />
            </>
          )}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
