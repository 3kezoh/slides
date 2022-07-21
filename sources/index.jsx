import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UserContextProvider } from "./context/UserContext";
import EditorContextProvider from "./context/EditorContext";
import '@fontsource/roboto/400.css';
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
      <EditorContextProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </EditorContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
