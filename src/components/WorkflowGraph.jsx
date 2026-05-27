import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

export default function WorkflowGraph({ workflow }) {
  if (!workflow) {
    return null;
  }

  const nodes = workflow.semanticSteps.map((step, index) => ({
    id: String(index + 1),

    position: {
      x: 250,
      y: index * 180,
    },

    data: {
      label: `

          ${step.condition || "Condition"}

          →

          ${step.action || "Action"}

        `,
    },

    type: "default",
  }));

  const edges = workflow.semanticSteps.slice(0, -1).map((_, index) => ({
    id: `e${index + 1}-${index + 2}`,

    source: String(index + 1),

    target: String(index + 2),

    animated: true,
  }));

  return (
    <div className="w-full h-full">
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
}
