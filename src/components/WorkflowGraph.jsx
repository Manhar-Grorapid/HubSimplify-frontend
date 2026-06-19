import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

export default function WorkflowGraph({ workflow }) {
  if (!workflow?.semanticSteps) {
    return null;
  }

  const nodes = [];
  const edges = [];

  workflow.semanticSteps.forEach((step, index) => {
    const conditionId = `condition-${index}`;
    const actionId = `action-${index}`;

    // condition node
    nodes.push({
      id: conditionId,

      position: {
        x: 100,
        y: index * 260,
      },

      data: {
        label: step.condition,
      },

      style: {
        background: "#fefce8",
        border: "2px solid #eab308",
        borderRadius: "14px",
        padding: "16px",
        width: 260,
        textAlign: "center",
        fontWeight: "600",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      },
    });

    // action node
    nodes.push({
      id: actionId,

      position: {
        x: 420,
        y: index * 260,
      },

      data: {
        label: step.action,
      },

      style: {
        background: "#eff6ff",
        border: "2px solid #3b82f6",
        borderRadius: "14px",
        padding: "16px",
        width: 290,
        textAlign: "center",
        fontWeight: "600",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      },
    });

    // edge
    edges.push({
      id: `edge-${index}`,

      source: conditionId,

      target: actionId,

      label: "THEN",

      animated: true,
    });
  });

  return (
    <div className="w-full h-[700px] bg-white rounded-2xl border">
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
}
