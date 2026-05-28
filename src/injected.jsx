import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import InjectedApp from "./components/InjectedApp";

const workflow = window.__WORKFLOW_DATA__;

const container = document.getElementById("workflow-simplifier-root");

const root = ReactDOM.createRoot(container);

root.render(
  <InjectedApp
    workflow={workflow}
    onClose={() => {
      container.remove();
    }}
  />,
);
