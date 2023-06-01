import Reduce from "./reduce";
import { useState } from "react";
import { Button, Typography, Space, message } from "antd";
type Props = {};
const { Title } = Typography;
function Index({}: Props) {
  const [count, setCount] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const add = () => {
    setCount((v) => v + 1);
  };
  const reduce = () => {
    setCount((v) => v - 1);
  };

  const info = () => {
    messageApi.info("This is a normal message");
  };
  return (
    <>
      <Title>{count}</Title>
      <Space>
        <Button type="primary" onClick={add}>
          点我加
        </Button>
        <Reduce reduce={reduce} />
        {contextHolder}
        <Button type="primary" onClick={info}>
          Message
        </Button>
      </Space>
    </>
  );
}

export default Index;
