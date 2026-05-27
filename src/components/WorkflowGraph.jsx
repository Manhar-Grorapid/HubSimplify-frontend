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
        y: index * 220,
      },

      data: {
        label: step.condition,
      },

      style: {
        background: "#FEF3C7",
        border: "1px solid #FCD34D",
        borderRadius: "10px",
        padding: "10px",
        width: 180,
        textAlign: "center",
      },
    });

    // action node
    nodes.push({
      id: actionId,

      position: {
        x: 420,
        y: index * 220,
      },

      data: {
        label: step.action,
      },

      style: {
        background: "#DBEAFE",
        border: "1px solid #60A5FA",
        borderRadius: "10px",
        padding: "10px",
        width: 220,
        textAlign: "center",
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
