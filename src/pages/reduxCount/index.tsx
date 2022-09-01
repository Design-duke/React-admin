import type { RootState } from "../../redux/index";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../redux/models/count";
import { Button } from "antd";

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
      <h1>{count}</h1>
      <Button type="primary" onClick={add} style={{ marginRight: "8px" }}>
        dispatch 加
      </Button>
      <Button type="primary" onClick={jian}>
        dispatch 减
      </Button>
    </div>
  );
}

export default Count;
