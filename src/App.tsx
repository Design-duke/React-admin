import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import Router from "./routers/index";
import AuthRouter from "@/routers/auth";
import { RootState } from "./redux";
import { ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { HashRouter } from "react-router";

function App() {
  const [i18nLocale, setI18nLocale] = useState(zhCN);
  const lange = useSelector((state: RootState) => state.language.lange);
  useEffect(() => {
    if (lange == "en") setI18nLocale(enUS);
    if (lange == "zhCn") setI18nLocale(zhCN);
  }, [lange]);

  return (
    <div className="App">
      <ConfigProvider locale={i18nLocale}>
        <HashRouter>
          <AuthRouter>
            <Router />
          </AuthRouter>
        </HashRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
