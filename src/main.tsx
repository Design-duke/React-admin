//import ReactDOM from "react-dom/client";
import ReactDOM from "react-dom";
import { store } from "./redux/index";
import { Provider } from "react-redux";
import App from "./App";
import "./index.less";
import "./locales/index";
//React18搭配antdlayout 会出现横向滚动条，导致屏幕闪烁，所以改用React17的渲染方式

//React18 with antdlayout will have a horizontal scroll bar, which will cause the screen to flicker, so the rendering method of React17 is used instead.
// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
