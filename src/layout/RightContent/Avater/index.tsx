import { Avatar, Menu } from "antd";
import HeaderDropdown from "../../HeaderDropdown/index";
import "../index.less";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function AvatarDropdown() {
  const navigate = useNavigate();
  const onMenuClick = (event: any) => {
    const { key } = event;
    if (key === "logout") {
      localStorage.removeItem("Mm");
      navigate("/");
      return;
    }
  };
  const menuItems: any = [
    // {
    //   key: "center",
    //   icon: <UserOutlined />,
    //   label: "个人中心",
    // },
    // {
    //   key: "settings",
    //   icon: <SettingOutlined />,
    //   label: "个人设置",
    // },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
    },
  ];
  const menuHeaderDropdown = (
    <Menu
      className="menu"
      selectedKeys={[]}
      items={menuItems}
      onClick={onMenuClick}
    />
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className="action account">
        <Avatar
          size="small"
          className="avatar"
          style={{ marginRight: "8px" }}
          src="https://joeschmoe.io/api/v1/random"
          alt="avatar"
        />
        <span className={`name anticon`}>design_duke</span>
      </span>
    </HeaderDropdown>
  );
}

export default AvatarDropdown;
