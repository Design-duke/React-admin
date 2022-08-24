import { Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useState } from "react";
import Collapsed from "./Collapsed/index";
import Items from "./Menu/index";
import "./index.less";
const { Header, Sider, Content } = Layout;
function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="layout">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["/Home"]}
            items={Items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Collapsed collapsed={collapsed} setCollapsed={setCollapsed} />
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
