import { Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router";
import { LogoutOutlined } from "@ant-design/icons";
import React from "react";

const AVATAR_URL =
  "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png";
const USER_NAME = "Design_duke";

const AvatarDropdown: React.FC = () => {
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
    <Dropdown menu={{ items, onClick }}>
      <span className="flex cursor-pointer items-center px-3">
        <Avatar size="small" className="mr-2" src={AVATAR_URL} alt="avatar" />
        <span>{USER_NAME}</span>
      </span>
    </Dropdown>
  );
};

export default AvatarDropdown;
