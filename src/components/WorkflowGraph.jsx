import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

export default function WorkflowGraph({ workflow }) {
  if (!workflow) {
    return null;
  }
  console.log(workflow.nodes);
  return (
    <div className="w-full h-full">
      <ReactFlow nodes={workflow.nodes} edges={workflow.edges} fitView />
    </div>
  );
}
