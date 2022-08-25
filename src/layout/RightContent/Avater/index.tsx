import { Avatar, Menu } from "antd";
import HeaderDropdown from "../../HeaderDropdown/index";
import "../index.less";

import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
function AvatarDropdown() {
  const menuItems: any = [
    {
      key: "center",
      icon: <UserOutlined />,
      label: "个人中心",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "个人设置",
    },
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
    <Menu className="menu" selectedKeys={[]} items={menuItems} />
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className="action account">
        <Avatar
          size="small"
          className="avatar"
          src="https://joeschmoe.io/api/v1/random"
          alt="avatar"
        />
        <span className={`name anticon`}>Serati Ma</span>
      </span>
    </HeaderDropdown>
  );
}

export default AvatarDropdown;
