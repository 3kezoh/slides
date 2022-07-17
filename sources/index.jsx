import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UserContextProvider } from "./context/UserContext";
import EditorContextProvider from "./context/EditorContext";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <BrowserRouter>
    <UserContextProvider>
      <EditorContextProvider>
        <App />
      </EditorContextProvider>
    </UserContextProvider>
  </BrowserRouter>
);
