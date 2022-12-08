import { HashRouter } from "react-router-dom";
import Router from "./routers/index";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux";
import AuthRouter from "@/routers/auth";
import "dayjs/locale/zh-cn";
import "./app.less";

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
