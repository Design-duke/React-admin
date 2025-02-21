import App from "./App";
import { createRoot } from "react-dom/client";
import { store } from "./redux/index";
import { Provider } from "react-redux";

import "./locales/index";
import "@/styles/index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<Provider store={store} children={<App />} />);
