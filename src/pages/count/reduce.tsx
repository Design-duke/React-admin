import { Button } from "antd";

function Reduce(prop: { reduce: any }) {
  const { reduce } = prop;

  return (
    <Button type="primary" onClick={reduce}>
      子组件调用父组件方法改变父组件数据
    </Button>
  );
}

export default Reduce;
