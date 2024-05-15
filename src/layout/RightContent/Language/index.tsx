import i18n from "i18next";
import { RootState } from "@/redux";
import { Dropdown, type MenuProps } from "antd";
import { setLanguage } from "@/redux/modules/language";
import { useDispatch, useSelector } from "react-redux";
import { TranslationOutlined } from "@ant-design/icons";

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
    <Dropdown menu={{ items, onClick }}>
      <TranslationOutlined className="text-lg cursor-pointer px-3" />
    </Dropdown>
  );
};

export default index;
