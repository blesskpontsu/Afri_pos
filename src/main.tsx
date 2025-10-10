import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import ClientProvider from "./lib/api/ClientProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ClientProvider>
          <App />
          <ToastContainer toastStyle={{ margin: 20 }} autoClose={3000} />
        </ClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
