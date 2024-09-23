import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  Typography,
  theme,
} from "antd";
import useDashboard from "../hooks/useDashboard";
import useAuthStore from "../store/auth";
import { Link, Route, Routes } from "react-router-dom";
import ROUTES from "../constants/ROUTES";
import { sidebarMenuMapping } from "../constants/MAPPINGS";
import Warehouses from "../components/pages/warehouses";
import InventoryItems from "../components/pages/inventoryItems.tsx";
import Purchases from "../components/pages/purchases/index.tsx";
import ExternalDispatch from "../components/pages/externalDispatch/index.tsx";
import Home from "../components/pages/home/index.tsx";
import StockRecords from "../components/pages/stockRecords/index.tsx";
import ExternalStockRecords from "../components/pages/externalStockRecords/index.tsx";
import Transit from "../components/pages/transit/index.tsx";
import Requests from "../components/pages/requests/index.tsx";
import ProductionRuns from "../components/pages/productionRuns/index.tsx";
import ProductSubmissions from "../components/pages/productSubmissions/index.tsx";
import Sales from "../components/pages/sales/index.tsx";
import InternalDispatch from "../components/pages/internalDispatch/index.tsx";
import InventoryTransfers from "../components/pages/inventoryTransfers/index.tsx";
import ReceivedVehicles from "../components/pages/receivedVehicles/index.tsx";
import DispatchedVehicles from "../components/pages/dispatchedVehicles/index.tsx";
import Employees from "../components/pages/employees/index.tsx";
import Departments from "../components/pages/departments/index.tsx";
import Positions from "../components/pages/positions/index.tsx";
import Payrolls from "../components/pages/payrolls/index.tsx";
import Expenses from "../components/pages/expenses/index.tsx";
import Enrollment from "../components/pages/enrollment/index.tsx";
import UserManagement from "../components/pages/userManagement/index.tsx";
import { LOGO } from "../assets/images/index.ts";
import AccountRestricted from "../components/pages/accountRestricted/index.tsx";

const { Header, Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { collapsed, handleCollapse, handleSignOut, isLoading } =
    useDashboard();
  const { userProfile } = useAuthStore();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: userProfile?.full_name || "",
    },
  ];

  return userProfile?.restricted ? (
    <AccountRestricted />
  ) : (
    <Layout className="min-h-screen">
      <Sider
        collapsedWidth={0}
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ zIndex: 100 }}
      >
        <div className="flex items-center justify-center py-3">
          <img className="w-40 h-40" src={LOGO} alt="" />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {sidebarMenuMapping[userProfile?.role || "DEFAULT"].map(
            (menu, index) => (
              <Menu.Item key={index + 1} icon={<menu.icon />}>
                <Link to={menu.path}>{menu.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="flex justify-between items-center"
          style={{ padding: 0, background: colorBgContainer, zIndex: 99 }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={handleCollapse}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="overflow-hidden whitespace-nowrap">
            <Typography className="inline-block text-lg animate-marquee">
              This Software Is Developed and Maintained By AbiyTech Digital
              Services, Reach Us Via Phone: 07069013128
            </Typography>
          </div>
          <div className="mr-5 cursor-pointer flex space-x-3 items-center">
            <Button loading={isLoading} type="primary" onClick={handleSignOut}>
              Logout
            </Button>
            <Dropdown menu={{ items }} placement="bottomRight">
              <Avatar size="large" icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Background Image Overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${LOGO})`,
              backgroundSize: "75%", // Adjust the size as needed
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
              opacity: 0.08, // Faint effect
            }}
          ></div>
          <Routes>
            <Route path={`${ROUTES.home}/*`} element={<Home />} />
            <Route path={`${ROUTES.warehouses}/*`} element={<Warehouses />} />
            <Route
              path={`${ROUTES.inventoryItems}/*`}
              element={<InventoryItems />}
            />
            <Route path={`${ROUTES.purchases}/*`} element={<Purchases />} />
            <Route path={`${ROUTES.sales}/*`} element={<Sales />} />
            <Route
              path={`${ROUTES.stockRecords}/*`}
              element={<StockRecords />}
            />
            <Route
              path={`${ROUTES.externalStockRecords}/*`}
              element={<ExternalStockRecords />}
            />
            <Route
              path={`${ROUTES.externalDispatch}/*`}
              element={<ExternalDispatch />}
            />
            <Route
              path={`${ROUTES.internalDispatch}/*`}
              element={<InternalDispatch />}
            />
            <Route path={`${ROUTES.transit}/*`} element={<Transit />} />
            <Route
              path={`${ROUTES.receivedVehicles}/*`}
              element={<ReceivedVehicles />}
            />
            <Route
              path={`${ROUTES.dispatchedVehicles}/*`}
              element={<DispatchedVehicles />}
            />
            <Route path={`${ROUTES.requests}/*`} element={<Requests />} />
            <Route
              path={`${ROUTES.productionRuns}/*`}
              element={<ProductionRuns />}
            />
            <Route
              path={`${ROUTES.productSubmissions}/*`}
              element={<ProductSubmissions />}
            />
            <Route
              path={`${ROUTES.inventoryTransfers}/*`}
              element={<InventoryTransfers />}
            />
            <Route path={`${ROUTES.employees}/*`} element={<Employees />} />
            <Route path={`${ROUTES.departments}/*`} element={<Departments />} />
            <Route path={`${ROUTES.positions}/*`} element={<Positions />} />
            <Route path={`${ROUTES.payroll}/*`} element={<Payrolls />} />
            <Route path={`${ROUTES.expenses}/*`} element={<Expenses />} />
            <Route path={`${ROUTES.enrollment}/*`} element={<Enrollment />} />
            {/* <Route
              path={`${ROUTES.transportFees}/*`}
              element={<TransportFees />}
            /> */}
            <Route
              path={`${ROUTES.userManagement}/*`}
              element={<UserManagement />}
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
