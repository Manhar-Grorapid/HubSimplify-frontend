import { useEffect, useState } from "react";
import WorkflowStepCard from "./components/WorkflowStepCard";
import WorkflowGraph from "./components/WorkflowGraph";

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
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT PANEL */}

          <div className="col-span-4">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
              <h1 className="text-3xl font-bold text-gray-800">
                {workflow.workflowName}
              </h1>

              <p className="text-gray-500 mt-2">{workflow.summary?.purpose}</p>

              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">Semantic Steps</h2>

                <div className="space-y-4">
                  {workflow.semanticSteps?.map((step, index) => (
                    <WorkflowStepCard key={index} index={index} step={step} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}

          <div className="col-span-8">
            <div className="bg-white rounded-2xl shadow-md p-6 min-h-[800px]">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Workflow Graph
              </h2>

              <div className="border-2 border-dashed border-gray-300 rounded-xl h-[700px] flex items-center justify-center text-gray-400">
                <WorkflowGraph workflow={workflow} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
