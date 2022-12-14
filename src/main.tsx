import App from "./App";
import ReactDOM from "react-dom/client";
import { store } from "./redux/index";
import { Provider } from "react-redux";

import "./index.less";
import "./locales/index";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
