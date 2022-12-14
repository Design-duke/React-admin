import { Avatar } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import HeaderDropdown from "@/layout/HeaderDropdown/index";

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
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          alt="avatar"
        />
        <span className={`name anticon`}>Design_duke</span>
      </span>
    </HeaderDropdown>
  );
}

export default AvatarDropdown;
