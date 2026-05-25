import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/workflow/:id" element={<App />} />
        <Route path="/oauth-success" element={<h1>TEST SUCCESS PAGE</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
