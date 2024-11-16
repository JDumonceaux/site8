import React from 'react';

import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import reportWebVitals from './lib/utils/reportWebVitals';
import ReduxProvider from './providers/ReduxProvider';
import { RouterProvider } from './providers/RouterProvider';

import './lib/utils/i18';
import './styles/main.css';
import './styles/reset.css';
// import { Amplify } from 'aws-amplify';
// import config from './amplifyconfiguration.json';
// Amplify.configure(config);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ReduxProvider>
        <HelmetProvider>
          <RouterProvider />
        </HelmetProvider>
      </ReduxProvider>
    </React.StrictMode>,
  );
} else {
  // eslint-disable-next-line no-console
  console.error('Failed to find the root element');
}

// eslint-disable-next-line no-console
reportWebVitals(console.log);
