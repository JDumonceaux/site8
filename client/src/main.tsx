import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './lib/utils/reportWebVitals';
import ReduxProvider from './providers/ReduxProvider';
import AppRouter from './providers/RouterProvider';

import './lib/utils/i18';
import './styles/main.css';
import './styles/reset.css';

// Create a Query Client for react-query
const queryClient = new QueryClient();

// Get the root element from the document
const rootElement = document.querySelector('#root');

if (rootElement) {
  // Render the application wrapped in necessary providers
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ReduxProvider>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </ReduxProvider>
    </React.StrictMode>,
  );
} else {
  // eslint-disable-next-line no-console
  console.error('Failed to find the root element');
}

// Report web vitals (change console.log to your analytics endpoint if needed)
// eslint-disable-next-line no-console
reportWebVitals(console.log);
