import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function App() {
  const { id } = useParams();

  const [workflow, setWorkflow] = useState(null);

  useEffect(() => {
    async function fetchWorkflow() {
      try {
        console.log("FETCH FUNCTION STARTED");

        const params = new URLSearchParams(window.location.search);

        const userId = params.get("userId");

        console.log("USER ID:", userId);

        console.log("WORKFLOW ID:", id);
        console.log("FULL URL:", window.location.href);

        console.log("SEARCH:", window.location.search);

        console.log("USER ID BEFORE REQUEST:", userId);

        const response = await axios.get(
          `https://hubsimplify-backend.onrender.com/workflow/${id}?userId=${userId}`,
          {
            headers: {
              "x-user-id": String(userId),
            },
          },
        );

        console.log("WORKFLOW RESPONSE:", response.data);

        setWorkflow(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchWorkflow();
  }, [id]);

  console.log("APP RENDERED");

  console.log("WORKFLOW STATE:", workflow);

  if (!workflow) {
    return (
      <div
        style={{
          padding: "20px",
          fontSize: "18px",
        }}
      >
        Loading workflow...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1>{workflow.workflowName}</h1>

      <p>{workflow.summary?.purpose}</p>
    </div>
  );
}
