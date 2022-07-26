import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import SlideContextProvider from "./context/SlideContext";
import '@fontsource/roboto/400.css';
import "./index.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
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
