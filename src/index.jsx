import "@fontsource/roboto/400.css";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import SlideContextProvider from "./context/SlideContext";
import { UserContextProvider } from "./context/UserContext";
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
    <UserContextProvider>
      <SlideContextProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </SlideContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
