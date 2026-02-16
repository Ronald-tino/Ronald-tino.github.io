import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// #region agent log
window.addEventListener("error", (event) => {
  fetch("http://127.0.0.1:7242/ingest/630c5e67-d737-4cc2-86ed-e688dbd200fd", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      runId: "post-fix",
      hypothesisId: "H2",
      location: "main.jsx:globalError",
      message: "window error",
      data: {
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
});

window.addEventListener("unhandledrejection", (event) => {
  fetch("http://127.0.0.1:7242/ingest/630c5e67-d737-4cc2-86ed-e688dbd200fd", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      runId: "post-fix",
      hypothesisId: "H3",
      location: "main.jsx:globalRejection",
      message: "unhandled promise rejection",
      data: {
        reason:
          event.reason && event.reason.message
            ? event.reason.message
            : String(event.reason),
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
});
// #endregion

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
