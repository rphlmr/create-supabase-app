import React from "react";

import { render } from "ink";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "@components/utils/error-fallback";

import { App } from "./app";

render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
  </ErrorBoundary>
);

process.on("uncaughtExceptionMonitor", (reason: string) => {
  render(<ErrorFallback error={new Error(reason)} />);
  process.exit(1);
});
