import { Button, Layout, Menu } from "antd";
import useDashboard from "../../hooks/useDashboard";
import { sidebarMenuMapping } from "../../constants/MAPPINGS";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/auth";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import useAdminMenu from "../../store/adminMenu";

function Sider() {
  const {
    collapsed,
    handleCollapse,
    isDesktop,
    isMobile,
    isLoading,
    handleMenuClick,
  } = useDashboard();
  const { Sider } = Layout;
  const { userProfile } = useAuthStore();
  const { currentMenu } = useAdminMenu();
  const menu =
    userProfile?.role === "ADMIN" || userProfile?.role === "SUPER ADMIN"
      ? currentMenu || userProfile?.role
      : userProfile?.role;

  return (
    <Sider
      collapsedWidth={isDesktop ? 100 : 0}
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="pt-14"
      style={{ zIndex: 100, position: isMobile ? "absolute" : "relative" }}
      width={250}
    >
      <Button
        size="large"
        loading={isLoading}
        type={isMobile ? "primary" : "text"}
        onClick={handleCollapse}
        className="absolute left-full rounded-none top-0"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        style={{
          fontSize: "16px",
          width: 56,
          height: 56,
          zIndex: 100,
        }}
      />
      <Menu
        onClick={handleMenuClick}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="h-screen overflow-y-auto"
      >
        {sidebarMenuMapping[menu || "DEFAULT"].map((menu, index) => (
          <Menu.Item key={index + 1} icon={<menu.icon />}>
            <Link to={menu.path}>{menu.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}

export default Sider;
