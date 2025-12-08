import { Spin } from "antd";
import { Suspense } from "react";

const lazyLoad = (Component: React.LazyExoticComponent<any>) => (
  <Suspense
    fallback={
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-transparent">
        <Spin size="large" />
      </div>
    }
  >
    <Component />
  </Suspense>
);

export default lazyLoad;
