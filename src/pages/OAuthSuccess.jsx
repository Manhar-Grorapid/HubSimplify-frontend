import { useEffect } from "react";

export default function OAuthSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const userId = "066e20b8-3333-486f-9b60-4fe9ac89232f";

    console.log("USER ID:", userId);

    if (userId) {
      chrome.storage.local.set({
        userId: userId,
      });

      console.log("User ID stored successfully");
    } else {
      console.error("No userId found in URL");
    }
  }, []);

  return (
    <div>
      <h1>OAuth Success Working</h1>
    </div>
  );
}
