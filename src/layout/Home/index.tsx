import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import Items from "../Menu/index";
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
            defaultSelectedKeys={["1"]}
            items={Items}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background "
            style={{ padding: "0 24px" }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "10px",
              minHeight: 280,
            }}
          >
            {/* <Routes>
              {routers.map((item: any) => (
                <Route
                  caseSensitive
                  path={item.path}
                  element={item.element}
                  key={item.path}
                ></Route>
              ))}
            </Routes> */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
