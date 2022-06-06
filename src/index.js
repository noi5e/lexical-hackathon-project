import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EditorContextProvider } from "./context/EditorContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EditorContextProvider>
      <App />
    </EditorContextProvider>
  </React.StrictMode>
);
