import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

export default function WorkflowGraph() {
  const nodes = [
    {
      id: "1",

      position: {
        x: 100,
        y: 100,
      },

      data: {
        label: "Trigger",
      },

      type: "default",
    },

    {
      id: "2",

      position: {
        x: 100,
        y: 250,
      },

      data: {
        label: "Delay",
      },

      type: "default",
    },
  ];

  const edges = [
    {
      id: "e1-2",

      source: "1",

      target: "2",
    },
  ];

  return (
    <div className="w-full h-full">
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
}
