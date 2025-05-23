import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/pages/Login";
import PrivateRoute from "./components/pages/PrivateRoute";
import useAuthStore from "./store/auth";
import { useEffect } from "react";
import { Spin } from "antd";
import Enroll from "./components/pages/enroll";
import { App as AntApp, ConfigProvider, theme } from "antd";
import useDarkMode from "./store/theme";
import Dashboard from "./views/Dashboard";

const AppWrapper = () => {
  const { isSessionLoading, checkLoginStatus } = useAuthStore();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const handleSession = async () => {
      await checkLoginStatus();
    };
    handleSession();
  }, []);

  if (isSessionLoading) {
    return (
      <div
        className="h-screen w-full flex items-center justify-center"
        style={{ background: colorBgContainer }}
      >
        <Spin tip="Loading" size="large" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/*" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/enroll" element={<Enroll />} />
      </Routes>
    </>
  );
};

function App() {
  const { darkMode } = useDarkMode();
  useEffect(() => {
    // Optionally, add/remove 'dark-mode' or 'light-mode' classes for custom styles
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  return (
    <ConfigProvider
      theme={{
        algorithm: [
          darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          theme.compactAlgorithm,
          // theme.darkAlgorithm,
        ],
        token: {
          // colorPrimary: "#fa8c16",
          colorPrimary: "#ED2B00",
          // colorPrimary: "#ABC32F",
          colorInfo: "#fa8c16",
          borderRadius: 0,
        },
        components: {
          Layout: {
            siderBg: darkMode ? "#222222" : "#222222",
          },

          Table: {
            borderColor: darkMode ? "#555555" : "#cccccc",
            headerBg: darkMode ? "#555555" : "#cccccc",
          },
          Menu: {
            /* here is your component tokens */
            itemBg: "#cccccc",
            darkItemBg: "#222222",
          },
        },
      }}
    >
      <AntApp>
        <AppWrapper />
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
