import { Space } from "antd";
import React from "react";
import Avater from "./Avater/index";
import "../index.less";
const GlobalHeaderRight: React.FC = () => {
  return (
    <Space>
      <Avater />
    </Space>
  );
};
export default GlobalHeaderRight;
