import { HashRouter } from "react-router-dom";
import Router from "./routers/index";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import "./app.less";
import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux";
function App() {
  const [i18nLocale, setI18nLocale] = useState(zhCN);
  const lange = useSelector((state: RootState) => state.setLanguage.lange);
  useEffect(() => {
    if (lange == "en") return setI18nLocale(enUS);
    if (lange == "zhCn") return setI18nLocale(zhCN);
  }, [lange]);
  return (
    <div className="App">
      <ConfigProvider locale={i18nLocale}>
        <HashRouter>
          <Router />
        </HashRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
