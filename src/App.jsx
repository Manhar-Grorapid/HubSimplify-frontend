import { useEffect, useState } from "react";
import WorkflowGraph from "./components/WorkflowGraph";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-2">Loading Workflow</h2>

            <p className="text-muted-foreground">
              Fetching workflow data from HubSpot...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT PANEL */}

          <div className="col-span-4">
            <Card className="sticky top-6 shadow-md">
              <CardContent className="p-6">
                <h1 className="text-3xl font-bold leading-tight wrap-break-word">
                  {workflow.workflowName}
                </h1>

                <Separator className="my-6" />
                <div className="flex flex-wrap gap-2 mb-8">
                  <Badge variant="secondary">
                    {workflow.summary?.workflowType}
                  </Badge>

                  <Badge>{workflow.summary?.totalActions} Actions</Badge>

                  <Badge variant="outline">
                    {workflow.summary?.totalBranches} Branches
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Action Types</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {workflow.summary?.actionTypes?.map((type, index) => (
                      <Badge key={index} variant="outline">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT PANEL */}

          <div className="col-span-8">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Workflow Graph</h2>

                <div className="border rounded-xl h-[700px] overflow-hidden">
                  <WorkflowGraph workflow={workflow} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
