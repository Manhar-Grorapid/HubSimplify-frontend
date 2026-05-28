import React from "react";
import ReactDOM from "react-dom/client";

window.renderSimpleReact = (container) => {
  const root = ReactDOM.createRoot(container);

  root.render(
    <div
      style={{
        padding: "20px",
        background: "white",
      }}
    >
      <h1>Hello from React</h1>
    </div>,
  );
};
