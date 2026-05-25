import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

function OAuthSuccess() {
  return (
    <div>
      <h1>HELLLLLLOO</h1>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/workflow/:id" element={<App />} />
      <Route
        path="/oauth-success"
        element={(() => {
          const params = new URLSearchParams(window.location.search);

          const userId = params.get("userId");

          if (userId) {
            localStorage.setItem("hubsimplify_user_id", userId);
          }

          return <h1>HELLLLLLOO</h1>;
        })()}
      />{" "}
    </Routes>
  </BrowserRouter>,
);
