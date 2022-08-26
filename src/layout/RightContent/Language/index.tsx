import HeaderDropdown from "../../HeaderDropdown/index";
import { TranslationOutlined } from "@ant-design/icons";
import { Menu, Space } from "antd";
import "../index.less";
import i18n from "i18next";

const index = () => {
  const onMenuClick = (event: any) => {
    const { key } = event;
    i18n.changeLanguage(key);
  };
  const menuItems: any = [
    {
      type: "divider" as const,
    },
    {
      key: "en",
      label: "English",
    },
    {
      key: "zhCn",
      label: "简体中文",
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
    <HeaderDropdown overlay={menuHeaderDropdown} className="action">
      <Space>
        <TranslationOutlined style={{ fontSize: "18px" }} />
      </Space>
    </HeaderDropdown>
  );
};

export default index;
