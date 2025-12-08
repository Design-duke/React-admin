import { Spin } from "antd";
import { Suspense } from "react";

const lazyLoad = (Component: React.LazyExoticComponent<any>) => (
  <Suspense
    fallback={
      <Spin size="large" className="flex h-full items-center justify-center" />
    }
  >
    <Component />
  </Suspense>
);

export default lazyLoad;
