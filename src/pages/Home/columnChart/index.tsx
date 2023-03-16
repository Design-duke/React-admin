import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Day from "./day";
import Month from "./month";
import Season from "./season";
import Year from "./year";
function ColumnChart() {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "日",
      children: <Day />,
    },
    {
      key: "2",
      label: "月",
      children: <Month />,
    },
    {
      key: "3",
      label: "季",
      children: <Season />,
    },
    {
      key: "4",
      label: "年",
      children: <Year />,
    },
  ];

  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
      style={{ marginLeft: "10px" }}
    />
  );
}

export default ColumnChart;
