import { Avatar } from "antd";
import type { MenuProps } from "antd";
import HeaderDropdown from "@/layout/HeaderDropdown/index";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "../index.less";

function AvatarDropdown() {
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem("Mm");
      navigate("/");
      return;
    }
  };
  const items: MenuProps["items"] = [
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
    },
  ];

  return (
    <HeaderDropdown menu={{ items, onClick }}>
      <span className="action account">
        <Avatar
          size="small"
          className="avatar"
          style={{ marginRight: "8px" }}
          src="https://joeschmoe.io/api/v1/random"
          alt="avatar"
        />
        <span className={`name anticon`}>Design_duke</span>
      </span>
    </HeaderDropdown>
  );
}

export default AvatarDropdown;
