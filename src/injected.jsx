import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import InjectedApp from "./components/InjectedApp";

console.log("INJECTED JS LOADED");

const root = document.getElementById("workflow-simplifier-root");

const workflow = window.workflowSimplifierData;

const reactRoot = ReactDOM.createRoot(root);

reactRoot.render(<InjectedApp workflow={workflow} />);
