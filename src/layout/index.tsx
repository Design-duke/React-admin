import Right from "./RightContent/index";
import Menu from "./Menu/index";
import { Button, Layout, theme } from "antd";
import React, { useEffect } from "react";
import { Outlet } from "react-router";
import type { RootState } from "@/redux/index";
import { useSelector, useDispatch } from "react-redux";
import { setIsCollapse } from "@/redux/modules/collapsed";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const dispatch = useDispatch();
  const collapsed = useSelector(
    (state: RootState) => state.collapsed.isCollapse
  );
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const setCollapsed = (value: boolean) => {
    dispatch(setIsCollapse(value));
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
  // 监听窗口大小变化，并只在组件挂载和卸载时添加/移除监听器
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = document.body.clientWidth;
      if (screenWidth < 1200) {
        dispatch(setIsCollapse(true));
      } else {
        dispatch(setIsCollapse(false));
      }
    };

    window.addEventListener("resize", handleResize);

    // 清理函数，在组件卸载时移除监听器
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="m-4 h-8 bg-gray-300" />
        <div style={{ height: "calc(100vh - 64px)" }}>
          <Menu />
        </div>
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex items-center justify-between"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
          <Right />
        </Header>
        <Content
          className="m-[10px]"
          style={{
            minHeight: 280,
            maxHeight: "calc(100vh - 64px - 20px)",
            overflow: "auto",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
