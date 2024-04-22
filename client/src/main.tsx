import './utils/i18';
import './styles/main.css';
import './styles/reset.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import reportWebVitals from './utils/reportWebVitals';
import { ReduxProvider } from './services/providers/ReduxProvider';
import { RouterProvider } from './services/providers/RouterProvider';
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
import { ApolloProvider } from 'services/providers/ApolloProvider';
Amplify.configure(config);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider>
      <ReduxProvider>
        <HelmetProvider>
          <RouterProvider />
        </HelmetProvider>
      </ReduxProvider>
    </ApolloProvider>
  </React.StrictMode>,
);

reportWebVitals(console.log);
