//import ReactDOM from "react-dom/client";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import { store } from "./redux/index";
import { Provider } from "react-redux";
import App from "./App";
import "./index.less";
//React18搭配antdlayout 会出现横向滚动条，导致屏幕闪烁，所以改用React17的渲染方式
// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById("root")
);
