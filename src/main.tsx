import App from "./App";
import ReactDOM from "react-dom/client";
import { store } from "./redux/index";
import { Provider } from "react-redux";

import "./locales/index";
import "@/styles/basic.less";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store} children={<App />} />
);
