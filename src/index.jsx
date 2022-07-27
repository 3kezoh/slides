import "@fontsource/roboto/400.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import { SlideProvider } from "./context/SlideContext";
import { UserProvider } from "./context/UserContext";
import "./index.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

root.render(
  <BrowserRouter>
    <UserProvider>
      <SlideProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </SlideProvider>
    </UserProvider>
  </BrowserRouter>
);
