import WorkflowGraph from "./WorkflowGraph";

export default function InjectedApp({ workflow, onClose }) {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <button
        onClick={onClose}
        className="fixed top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Close
      </button>

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-6">
            {/* LEFT PANEL */}

            <div className="col-span-4">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
                <h1 className="text-3xl font-bold text-gray-800">
                  {workflow.workflowName}
                </h1>

                <div className="mt-8 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold">Workflow Type</h2>

                    <p className="text-gray-600 mt-2">
                      {workflow.summary?.workflowType}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">Total Actions</h2>

                    <p className="text-gray-600 mt-2">
                      {workflow.summary?.totalActions}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">Total Branches</h2>

                    <p className="text-gray-600 mt-2">
                      {workflow.summary?.totalBranches}
                    </p>
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

                <div className="border-2 border-dashed border-gray-300 rounded-xl h-[700px]">
                  <WorkflowGraph workflow={workflow} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
