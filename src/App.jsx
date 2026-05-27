import { useEffect, useState } from "react";

export default function App() {
  const [workflow, setWorkflow] = useState(null);

  useEffect(() => {
    function handleMessage(event) {
      console.log("EVENT ORIGIN:", event.origin);
      console.log("MESSAGE RECEIVED:", event.data);

      if (event.data?.type === "WORKFLOW_DATA") {
        console.log("SETTING WORKFLOW");

        setWorkflow(event.data.payload);
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  console.log("WORKFLOW STATE:", workflow);

  console.log("NEW FRONTEND BUILD ACTIVE");

  if (!workflow) {
    return (
      <div
        style={{
          padding: "20px",
          fontFamily: "Arial",
        }}
      >
        <h2>Waiting for workflow data...</h2>
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

      <hr />

      <h2>Semantic Steps</h2>

      <ul>
        {workflow.semanticSteps?.map((step, index) => (
          <li key={index}>
            {typeof step === "string" ? step : JSON.stringify(step)}
          </li>
        ))}
      </ul>
    </div>
  );
}
