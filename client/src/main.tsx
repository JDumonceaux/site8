// import { scan } from 'react-scan';
import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './lib/utils/reportWebVitals';
import ReduxProvider from './providers/ReduxProvider';
import { RouterProvider } from './providers/RouterProvider';

import './lib/utils/i18';
import './styles/main.css';
import './styles/reset.css';
// import { Amplify } from 'aws-amplify';
// import config from './amplifyconfiguration.json';
// Amplify.configure(config);

// Create a client
const queryClient = new QueryClient();

const rootElement = document.querySelector('#root');
if (rootElement) {
  // scan({
  //   enabled: true,
  //   log: true,
  // });

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ReduxProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider />
        </QueryClientProvider>
      </ReduxProvider>
    </React.StrictMode>,
  );
} else {
  // eslint-disable-next-line no-console
  console.error('Failed to find the root element');
}

// eslint-disable-next-line no-console
reportWebVitals(console.log);
