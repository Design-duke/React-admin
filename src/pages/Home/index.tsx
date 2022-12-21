import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { DataNode, TreeProps } from "antd/es/tree";
import { Button, DatePicker, Tree, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./index.less";
dayjs.extend(customParseFormat);

const { Title } = Typography;

function Home() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const treeData: DataNode[] = [
    {
      title: "parent 1",
      key: "0-0",
      children: [
        {
          title: "parent 1-0",
          key: "0-0-0",
          children: [
            {
              title: "leaf",
              key: "0-0-0-0",
              disableCheckbox: true,
            },
            {
              title: "leaf",
              key: "0-0-0-1",
            },
          ],
        },
        {
          title: "parent 1-1",
          key: "0-0-1",
          children: [
            {
              title: <span style={{ color: "#1890ff" }}>sss</span>,
              key: "0-0-1-0",
            },
          ],
        },
      ],
    },
  ];
  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };
  const editHandel = (row: any) => {
    console.log(row);
    return false;
  };
  const delHandel = (row: any) => {
    console.log(row);
  };
  const titleRender = (nodeData: any) => (
    <div className="box">
      <div className="title">{nodeData.title}</div>
      <div className="rightButton">
        <Button
          type="primary"
          className="rightButtonLeft"
          icon={<EditOutlined />}
          size="small"
          onClick={() => editHandel(nodeData)}
        />
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => delHandel(nodeData)}
        />
      </div>
    </div>
  );

  const { t, i18n } = useTranslation();
  useEffect(() => {
    let timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      {/* @ts-ignore */}
      <h1 text={t("Home.Welcome")}>{t("Home.Welcome")}</h1>
      <DatePicker defaultValue={dayjs()} />
      <Title>{time}</Title>
      <Tree
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
        showLine
        titleRender={titleRender}
      />
    </div>
  );
}

export default Home;
