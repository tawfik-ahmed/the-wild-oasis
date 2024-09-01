import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import ErrorFallback from "./ui/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
