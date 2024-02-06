import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemGenerator";
import { adminPaths } from "../../routes/AdminRoutes";
import { getCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";
import { moderatorPaths } from "../../routes/ModeratorRoutes";
import { vendorPaths } from "../../routes/VendorRoutes";
const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  CUSTOMER: "customer",
  MODERATOR: "moderator",
  VENDOR: "vendor",
};

const Sidebar = () => {
  const user = useAppSelector(getCurrentUser);

  let sidebarItems;

  switch (user!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.MODERATOR:
      sidebarItems = sidebarItemsGenerator(moderatorPaths, userRole.MODERATOR);
      break;
    case userRole.VENDOR:
      sidebarItems = sidebarItemsGenerator(vendorPaths, userRole.VENDOR);
      break;
    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", left: "0", top: "0" }}
    >
      <div
        style={{
          color: "white",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>HUB Uni</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
