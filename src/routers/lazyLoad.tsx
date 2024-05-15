import { Spin } from "antd";
import { Suspense } from "react";

const lazyLoad = (Component: React.LazyExoticComponent<any>) => (
  <Suspense
    fallback={
      <Spin size="large" className="flex items-center justify-center h-full" />
    }
  >
    <Component />
  </Suspense>
);

export default lazyLoad;
