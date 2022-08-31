import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { useState } from "react";
import Collapsed from "./Collapsed/index";
import Right from "./RightContent/index";
import Menu from "./Menu/index";
import "./index.less";

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

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
