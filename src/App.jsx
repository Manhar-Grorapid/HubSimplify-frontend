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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {workflow.workflowName}
          </h1>

          <p className="text-gray-500 mt-2">{workflow.summary?.purpose}</p>
        </div>
      </div>
    </div>
  );
}
