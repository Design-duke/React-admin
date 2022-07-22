import { Button } from "antd";
import React from "react";

type Props = {};

function Reduce(prop: { reduce: any }) {
  const { reduce } = prop;
  return (
    <Button type="primary" onClick={reduce}>
      Reduce
    </Button>
  );
}

export default Reduce;
