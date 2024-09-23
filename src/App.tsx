import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/pages/Login";
import PrivateRoute from "./components/pages/PrivateRoute";
import Dashboard from "./views/Dashboard";
import useAuthStore from "./store/auth";
import { useEffect } from "react";
import { Spin } from "antd";
import Enroll from "./components/pages/enroll";

function App() {
  const { isSessionLoading, checkLoginStatus } = useAuthStore();

  useEffect(() => {
    const handleSession = async () => {
      await checkLoginStatus();
    };
    handleSession();
  }, []);

  if (isSessionLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
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
}

export default App;
