import './utils/i18';
import './main.css';
import './reset.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import reportWebVitals from './utils/reportWebVitals';
import { ReduxProvider } from './services/providers/ReduxProvider';
import { RouterProvider } from './services/providers/RouterProvider';
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider>
      <HelmetProvider>
        <RouterProvider />
      </HelmetProvider>
    </ReduxProvider>
  </React.StrictMode>,
);

reportWebVitals(console.log);
