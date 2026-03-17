import React from "react";
import ReactDOM from "react-dom/client";
import FreshSaladWebsite from "./app";
import "./app.css";
import "./i18n"; // load i18n before App

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <FreshSaladWebsite />
    </React.StrictMode>
);
