import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";

function OAuthSuccess() {

  useEffect(() => {

    try {

      const params =
        new URLSearchParams(
          window.location.search
        );

      const userId =
        params.get("userId");

      if (userId) {

        localStorage.setItem(
          "hubsimplify_user_id",
          userId
        );

        console.log(
          "USER ID STORED:",
          userId
        );
      }

    } catch (error) {

      console.log(error);
    }

  }, []);

  return (

    <div>

      <h1>
        HubSpot Connected Successfully
      </h1>

      <p>
        You can close this tab.
      </p>

    </div>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<App />}
        />

        <Route
          path="/workflow/:id"
          element={<App />}
        />

        <Route
          path="/oauth-success"
          element={<OAuthSuccess />}
        />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>
);