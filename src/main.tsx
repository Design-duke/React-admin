//import ReactDOM from "react-dom/client";
import ReactDOM from "react-dom";
import { store } from "./redux/index";
import { Provider } from "react-redux";
import App from "./App";
import "./index.less";
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
