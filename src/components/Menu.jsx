import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { auth } from "../services/firebase-config";

function Menu() {
  const { currentUser } = useContext(UserContext);

  const logout = useCallback(() => {
    auth.signOut();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Slides
          </Typography>
          {currentUser ? (
            <>
              <Link to="/workspace" className="menu-link">
                <Button className="menu-link">Rooms</Button>
              </Link>
              <Button onClick={logout}>Se déconnecter</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="menu-link">
                <Button>Se connecter</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Menu;
