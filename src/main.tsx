import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { App as AntApp, ConfigProvider, theme } from "antd";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { IconContext } from "react-icons";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Disable auto refetching globally
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <IconContext.Provider value={{ className: "w-7 h-auto text-gray-500" }}>
          <ConfigProvider
            theme={{
              algorithm: [theme.defaultAlgorithm, theme.compactAlgorithm],
              token: {
                // colorPrimary: "#fa8c16",
                colorPrimary: "#ABC32F",
                colorInfo: "#fa8c16",
                borderRadius: 3,
              },
              components: {
                Layout: {
                  siderBg: "#092215",
                },
                Menu: {
                  /* here is your component tokens */
                  itemBg: "#006400",
                  darkItemBg: "#092215",
                },
              },
            }}
          >
            <AntApp>
              <App />
            </AntApp>
          </ConfigProvider>
        </IconContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
