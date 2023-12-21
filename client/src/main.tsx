import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./main.css";

import { ReduxProvider } from "./services/providers/ReduxProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import AppSetup from "./components/common/AppSetup/AppSetup.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider>
        <>
          <AppSetup />
          <App />
        </>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
);
