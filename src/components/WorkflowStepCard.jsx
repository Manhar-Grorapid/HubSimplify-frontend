export default function WorkflowStepCard({ index, step }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">Step {index + 1}</p>

          <h2 className="text-lg font-semibold text-gray-800 mt-1">
            {typeof step === "string" ? step : step.label || "Workflow Step"}
          </h2>
        </div>
      </div>
    </div>
  );
}
