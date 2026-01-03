import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/app';
import { logError } from './lib/utils/errorHandler';

// Grab the root container (must match your index.html)
const container = document.querySelector('#root');
if (container == null) throw new Error('Root element with id="root" not found');

// Create a React root with comprehensive error handling (React 19)
const root = createRoot(container, {
  // Called when React catches an error in an Error Boundary
  onCaughtError: (error: unknown, errorInfo) => {
    logError(error, {
      componentStack: errorInfo.componentStack,
      context: 'ErrorBoundaryCaught',
    });
  },

  // Called when React automatically recovers from errors
  onRecoverableError: (error: unknown, errorInfo) => {
    logError(
      error,
      {
        componentStack: errorInfo.componentStack,
        context: 'RecoverableError',
      },
      'warning',
    );
  },

  // Called when an error is thrown and NOT caught by any Error Boundary
  onUncaughtError: (error: unknown, errorInfo) => {
    logError(error, {
      componentStack: errorInfo.componentStack,
      context: 'UncaughtError',
      severity: 'fatal',
    });
  },
});

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Send web vitals to console (swap to your analytics)
// reportWebVitals(console.log);
