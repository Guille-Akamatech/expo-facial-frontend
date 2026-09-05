import React from "react";
import ReactDOM from "react-dom/client";
import "./amplifyConfig"; // debe importarse antes que App para que Amplify.configure() corra primero
import App from "./App.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
