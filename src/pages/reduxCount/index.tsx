import type { RootState } from "@/redux/index";
import { Button, Typography, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "@/redux/models/count";

const { Title } = Typography;

function Count() {
  const count = useSelector((state: RootState) => state.count.value);
  const dispatch = useDispatch();
  const add = () => {
    dispatch(increment());
  };
  const jian = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <Title>{count}</Title>
      <Space>
        <Button type="primary" onClick={add}>
          dispatch 加
        </Button>
        <Button type="primary" onClick={jian}>
          dispatch 减
        </Button>
      </Space>
    </div>
  );
}

export default Count;
