import { useEffect } from "react";

export default function OAuthSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const userId = params.get("userId");

    if (userId) {
      localStorage.setItem("hubsimplify_user_id", userId);

      console.log("USER ID STORED:", userId);
    }
  }, []);

  return (
    <div>
      <h1>OAuth Success Working</h1>
    </div>
  );
}
