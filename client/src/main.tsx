import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/App';

// Grab the root container (must match your index.html)
const container = document.querySelector('#root');
if (!container) throw new Error('Root element with id="root" not found');

// Create a React root with recoverable-error handling
const root = createRoot(container, {
  onRecoverableError: (error: unknown, errorInfo) => {
    // Won’t unmount the whole tree—just logs    // eslint-disable-next-line no-console    console.error('Recoverable React error:', error, errorInfo);
  },
});

// Initial render
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Send web vitals to console (swap to your analytics)
// reportWebVitals(console.log);
