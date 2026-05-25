import { useState, useEffect } from "react";
import axios from "axios";

import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

import { useParams } from "react-router-dom";
console.log("APP RENDERED");
function App() {
  // const { id } = useParams();
  // const id = "3721822915";
  let id;

  const path = window.location.pathname;

  if (path.includes("/flow/")) {
    // HubSpot URL
    id = path.split("/flow/")[1]?.split("/")[0];
  } else {
    // localhost route
    id = path.split("/workflow/")[1];
  }

  const [workflowId, setWorkflowId] = useState("");

  const [workflow, setWorkflow] = useState(null);

  const [nodes, setNodes] = useState([]);

  const [edges, setEdges] = useState([]);

  useEffect(() => {
    if (id) {
      setWorkflowId(id);

      fetchWorkflow(id);
    }
  }, [id]);

  const fetchWorkflow = async (customId) => {
    console.log("FETCH FUNCTION STARTED");
    try {
      console.log("SENDING REQUEST");
      const response = await axios.get(
        `https://hubsimplify-backend.onrender.com/workflow/${customId || workflowId}`,
      );

      const data = response.data;
      console.log("API DATA:", response.data);

      setWorkflow(data);

      const flowNodes = [];
      const flowEdges = [];

      // =====================================
      // CONDITIONAL WORKFLOWS
      // =====================================

      if (data.semanticSteps.length > 0) {
        data.semanticSteps.forEach((step, index) => {
          const conditionId = `condition-${index}`;

          const actionId = `action-${index}`;

          // condition node
          flowNodes.push({
            id: conditionId,

            data: {
              label: step.condition,
            },

            position: {
              x: 100,
              y: index * 220,
            },

            style: {
              background: "#fff3cd",
              padding: 10,
              borderRadius: 10,
              width: 180,
              border: "1px solid #999",
            },
          });

          // action node
          flowNodes.push({
            id: actionId,

            data: {
              label: step.action,
            },

            position: {
              x: 450,
              y: index * 220,
            },

            style: {
              background: "#d1ecf1",
              padding: 10,
              borderRadius: 10,
              width: 260,
              border: "1px solid #999",
            },
          });

          // edge
          flowEdges.push({
            id: `edge-${index}`,

            source: conditionId,
            target: actionId,

            label: "THEN",
          });
        });
      }

      // =====================================
      // SIMPLE LINEAR WORKFLOWS
      // =====================================
      else {
        data.nodes.forEach((node, index) => {
          flowNodes.push({
            id: node.id,

            data: {
              label: node.label,
            },

            position: {
              x: 300,
              y: index * 180,
            },

            style: {
              background: "#dbeafe",
              padding: 10,
              borderRadius: 10,
              width: 240,
              border: "1px solid #999",
            },
          });
        });

        data.edges.forEach((edge, index) => {
          flowEdges.push({
            id: `edge-${index}`,

            source: edge.from,
            target: edge.to,
          });
        });
      }

      console.log("FLOW NODES:", flowNodes);

      console.log("FLOW EDGES:", flowEdges);

      setNodes(flowNodes);
      setEdges(flowEdges);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("WORKFLOW STATE:", workflow);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        background: "#f3f4f6",
        fontFamily: "Arial",
        overflow: "hidden",
      }}
    >
      {/* LEFT SIDEBAR */}
      <div
        style={{
          width: "400px",
          background: "white",
          borderRight: "1px solid #ddd",
          padding: "25px",
          overflowY: "auto",
          overflowX: "hidden",
          wordBreak: "break-word",
        }}
      >
        {workflow && (
          <>
            <h1
              style={{
                fontSize: "28px",
                marginBottom: "25px",
                lineHeight: "1.3",
              }}
            >
              {workflow.workflowName}
            </h1>

            <h2>Purpose</h2>

            <p>{workflow.summary.purpose}</p>

            <h2
              style={{
                marginTop: "30px",
              }}
            >
              Main Checks
            </h2>

            <ul>
              {workflow.summary.checks.map((check, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "8px",
                  }}
                >
                  {check}
                </li>
              ))}
            </ul>

            <h2
              style={{
                marginTop: "30px",
              }}
            >
              Main Actions
            </h2>

            <ul>
              {workflow.summary.actions.map((action, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "8px",
                  }}
                >
                  {action}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* RIGHT GRAPH */}
      <div
        style={{
          flex: 1,
          height: "100%",
          background: "#f3f4f6",
        }}
      >
        <ReactFlow nodes={nodes} edges={edges} fitView />
      </div>
    </div>
  );
}

export default App;
