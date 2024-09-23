import React from "react";
import { Card, Table } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { LOGO } from "../../../assets/images";
import useAuthStore from "../../../store/auth";

const Home: React.FC = () => {
  const { userProfile } = useAuthStore();
  const userName = userProfile?.full_name || "User"; // Fallback to 'User' if full_name is missing

  // Data for the user profile table
  const userData = [
    { key: "1", label: "Full Name", value: userProfile?.full_name || "N/A" },
    { key: "2", label: "Username", value: userProfile?.username || "N/A" },
    { key: "3", label: "Role", value: userProfile?.role || "N/A" },
    { key: "4", label: "Warehouse", value: userProfile?.warehouse || "N/A" },
  ];

  // Table columns
  const columns = [
    { title: "Label", dataIndex: "label", key: "label" },
    { title: "Information", dataIndex: "value", key: "value" },
  ];

  return (
    <div className="flex justify-center items-center p-10 bg-gray-100">
      <Card
        className="shadow-lg rounded-lg p-5"
        style={{
          width: "100%",
          maxWidth: 600,
          background: "white",
        }}
        title={
          <div className="flex flex-col items-center">
            <img src={LOGO} alt="Logo" className="w-48 h-48 mb-2 border" />
            <div className="flex items-center justify-center text-2xl font-bold text-gray-800">
              <SmileOutlined className="mr-2 text-blue-500" />
              Welcome to Your Portal Dashboard
            </div>
          </div>
        }
      >
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Hello, {userName}!
          </h2>
          <p className="text-gray-600 mb-6">
            This is your dashboard, use the Menu on the left to access various
            sections of this software!
          </p>

          {/* User Profile Table */}
          <Table
            dataSource={userData}
            columns={columns}
            pagination={false} // Disabling pagination since it's a small data set
            bordered
            className="mb-6"
          />
        </div>
      </Card>
    </div>
  );
};

export default Home;
