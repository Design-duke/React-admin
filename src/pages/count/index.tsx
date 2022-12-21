import Reduce from "./reduce";
import { useState } from "react";
import { Button, Typography, Space } from "antd";
type Props = {};
const { Title } = Typography;
function Index({}: Props) {
  const [count, setCount] = useState(0);
  const add = () => {
    setCount((v) => v + 1);
  };
  const reduce = () => {
    setCount((v) => v - 1);
  };

  return (
    <>
      <Title>{count}</Title>
      <Space>
        <Button type="primary" onClick={add}>
          点我加
        </Button>
        <Reduce reduce={reduce} />
      </Space>
    </>
  );
}

export default Index;
