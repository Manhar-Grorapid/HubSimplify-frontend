import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";

import InjectedApp from "./components/InjectedApp";

const container = document.getElementById("workflow-simplifier-root");

const workflow = JSON.parse(container.dataset.workflow);

const root = ReactDOM.createRoot(container);

root.render(
  <InjectedApp
    workflow={workflow}
    onClose={() => {
      container.remove();
    }}
  />,
);
