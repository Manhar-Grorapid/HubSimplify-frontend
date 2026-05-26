import { useEffect, useState } from "react";

export default function App() {
  const [workflow, setWorkflow] = useState(null);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      console.log("MESSAGE RECEIVED:", event.data);

      if (event.data?.type === "WORKFLOW_DATA") {
        setWorkflow(event.data.payload);
      }
    });
  }, []);

  console.log("WORKFLOW STATE:", workflow);
  console.log("NEW FRONTEND BUILD ACTIVE");

  if (!workflow) {
    return (
      <div
        style={{
          padding: "20px",
        }}
      >
        Loading workflow...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>{workflow.workflowName}</h1>

      <p>{workflow.summary?.purpose}</p>
    </div>
  );
}
