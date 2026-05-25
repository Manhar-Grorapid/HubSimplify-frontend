import React, { useEffect } from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

function OAuthSuccess() {

  return (
    <div>
      <h1>HubSpot Connected Successfully</h1>

      <p>You can close this tab.</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/workflow/:id" element={<App />} />

        <Route path="/oauth-success" element={<OAuthSuccess />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
