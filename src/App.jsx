import { useEffect, useState } from "react";
import WorkflowGraph from "./components/WorkflowGraph";

export default function App() {
  const [workflow, setWorkflow] = useState(null);

  useEffect(() => {
    console.log("Build 9999999");
    console.log("Build 1119999999");
    async function loadWorkflow() {
      try {
        const workflowId = window.location.pathname.split("/workflow/")[1];

        const userId = new URLSearchParams(window.location.search).get(
          "userId",
        );

        console.log("WORKFLOW ID:", workflowId);
        console.log("USER ID:", userId);

        const response = await fetch(
          `https://hubsimplify-backend.onrender.com/workflow/${workflowId}`,
          {
            headers: {
              "x-user-id": userId,
            },
          },
        );

        const data = await response.json();

        console.log("WORKFLOW RESPONSE:", data);

        setWorkflow(data);
      } catch (error) {
        console.error("LOAD ERROR:", error);
      }
    }

    loadWorkflow();
  }, []);

  console.log("WORKFLOW STATE:", workflow);

  console.log("Manhar test");

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
              <h1 className="text-4xl font-bold text-gray-800 leading-tight break-words">
                {workflow.workflowName}
              </h1>

              <div className="mt-8">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Workflow Type
                  </h3>

                  <p className="text-gray-600 mt-1">
                    {workflow.summary?.workflowType}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Total Actions
                  </h3>

                  <p className="text-gray-600 mt-1">
                    {workflow.summary?.totalActions}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Total Branches
                  </h3>

                  <p className="text-gray-600 mt-1">
                    {workflow.summary?.totalBranches}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Action Types
                  </h3>

                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    {workflow.summary?.actionTypes?.map((type, index) => (
                      <li key={index}>{type}</li>
                    ))}
                  </ul>
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

              <div className="border-2 border-dashed border-gray-300 rounded-xl h-[700px] overflow-hidden">
                <WorkflowGraph workflow={workflow} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
