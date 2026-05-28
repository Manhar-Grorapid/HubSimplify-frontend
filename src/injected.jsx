import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import InjectedApp from "./components/InjectedApp";

window.renderWorkflowSimplifier = (
    container,
    workflow
) => {

    const root =
        ReactDOM.createRoot(container);

    root.render(

        <InjectedApp
            workflow={workflow}
            onClose={() => {

                container.remove();

            }}
        />

    );

};