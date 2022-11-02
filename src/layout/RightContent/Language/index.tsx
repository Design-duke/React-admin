import HeaderDropdown from "@/layout/HeaderDropdown/index";
import { TranslationOutlined } from "@ant-design/icons";
import { Space } from "antd";
import type { MenuProps } from "antd";
import i18n from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/redux/models/language";
import { RootState } from "@/redux";

import "../index.less";

const index = () => {
  const language = useSelector((state: RootState) => state.language.lange);
  const dispatch = useDispatch();
  const onClick: MenuProps["onClick"] = ({ key }) => {
    i18n.changeLanguage(key);
    dispatch(setLanguage(key));
  };
  const items: MenuProps["items"] = [
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

  return (
    <HeaderDropdown menu={{ items, onClick }} className="action">
      <Space>
        <TranslationOutlined style={{ fontSize: "18px" }} />
      </Space>
    </HeaderDropdown>
  );
};

export default index;
