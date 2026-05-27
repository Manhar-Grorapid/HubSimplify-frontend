import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import OAuthSuccess from "./pages/OAuthSuccess.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/workflow/:id" element={<App />} />

      <Route path="/oauth-success" element={<OAuthSuccess />} />
    </Routes>
  </BrowserRouter>
);
