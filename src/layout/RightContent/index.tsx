import { Space } from "antd";
import React from "react";
import Avater from "./Avater/index";
import Language from "./Language";
import "../index.less";
const GlobalHeaderRight: React.FC = () => {
  return (
    <Space size="middle">
      <Avater />
      <Language />
    </Space>
  );
};
export default GlobalHeaderRight;
