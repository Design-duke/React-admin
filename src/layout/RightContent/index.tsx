import React from "react";
import Language from "./Language";
import Avater from "./Avater/index";
import { Space } from "antd";

import "../index.less";

const GlobalHeaderRight: React.FC = () => {
  return (
    <Space>
      <Avater />
      <Language />
    </Space>
  );
};
export default GlobalHeaderRight;
