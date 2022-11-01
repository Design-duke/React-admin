import HeaderDropdown from "../../HeaderDropdown/index";
import { TranslationOutlined } from "@ant-design/icons";
import { Menu, Space } from "antd";
import "../index.less";
import i18n from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../../redux/models/language";
import { RootState } from "../../../redux";

const index = () => {
  const language = useSelector((state: RootState) => state.language.lange);
  const dispatch = useDispatch();
  const onMenuClick = (event: any) => {
    const { key } = event;
    i18n.changeLanguage(key);
    dispatch(setLanguage(key));
  };
  const menuItems: any = [
    {
      type: "divider" as const,
    },
    {
      key: "en",
      label: "English",
      disabled: language === "en",
    },
    {
      key: "zhCn",
      label: "简体中文",
      disabled: language === "zhCn",
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
