import { StrictMode } from 'react';

import { App } from 'app/app';
import ReactDOM from 'react-dom/client';

//import reportWebVitals from './lib/utils/reportWebVitals';

// Get the root element from the document
const rootElement = document.querySelector('#root');

if (!rootElement) {
  throw new Error('No root element found');
}

// Render the application wrapped in necessary providers
ReactDOM.createRoot(rootElement, {
  onCaughtError: (error, errorInfo) => {
    // Handle errors in the application
    // eslint-disable-next-line no-console
    console.error('Error caught in ReactDOM:', error, errorInfo);
  },
  onUncaughtError: (error, errorInfo) => {
    // Handle uncaught errors in the application
    // eslint-disable-next-line no-console
    console.error('Uncaught error in ReactDOM:', error, errorInfo);
  },
}).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Report web vitals (change console.log to your analytics endpoint if needed)

//reportWebVitals(console.log);
