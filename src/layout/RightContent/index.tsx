import { Space } from "antd";
import React from "react";
import Avater from "./Avater/index";
import Language from "./Language";
import "../index.less";
const GlobalHeaderRight: React.FC = () => {
  return (
    <Space
      size="middle"
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        padding: " 0 12px",
        cursor: "pointer",
        transition: " all 0.3s",
        justifyContent: "flex-end",
      }}
    >
      <Avater />
      <Language />
    </Space>
  );
};
export default GlobalHeaderRight;
