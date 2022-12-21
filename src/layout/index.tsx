import Collapsed from "./Collapsed/index";
import Right from "./RightContent/index";
import Menu from "./Menu/index";
import { Layout } from "antd";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import type { RootState } from "@/redux/index";
import { setIsCollapse } from "@/redux/models/layout";
import { useSelector, useDispatch } from "react-redux";

import "./index.less";

const { Header, Sider, Content } = Layout;

function App() {
  const dispatch = useDispatch();
  const collapsed = useSelector(
    (state: RootState) => state.collapsed.isCollapse
  );

  const setCollapsed = () => {
    dispatch(setIsCollapse(!collapsed));
  };
  // 监听窗口大小变化
  const listeningWindow = () => {
    window.onresize = () =>
      (() => {
        let screenWidth = document.body.clientWidth;
        if (!collapsed && screenWidth < 1200) dispatch(setIsCollapse(true));
        if (!collapsed && screenWidth > 1200) dispatch(setIsCollapse(false));
      })();
  };
  useEffect(() => {
    listeningWindow();
  }, []);

  return (
    <div className="layout">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background header"
            style={{ padding: "0 16px 0 0" }}
          >
            <Collapsed collapsed={collapsed} setCollapsed={setCollapsed} />
            <Right />
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "10px",
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
