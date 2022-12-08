import { Button, Typography } from "antd";
import { useState } from "react";
import Reduce from "./reduce";
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
      <Button type="primary" onClick={add} style={{ marginRight: "8px" }}>
        点我加
      </Button>
      <Reduce reduce={reduce}></Reduce>
    </>
  );
}

export default Index;
