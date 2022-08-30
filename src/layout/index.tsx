import { Outlet, useLocation } from "react-router-dom";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import Collapsed from "./Collapsed/index";
import Items from "./Menu/index";
import Right from "./RightContent/index";
const { Header, Sider, Content } = Layout;
import * as Icons from "@ant-design/icons";
import React from "react";

import "./index.less";
function App() {
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [collapsed, setCollapsed] = useState(false);

  type MenuItem = Required<MenuProps>["items"][number];
  const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  };
  // 动态渲染 Icon 图标
  const customIcons: { [key: string]: any } = Icons;
  const addIcon = (name: string) => {
    return React.createElement(customIcons[name]);
  };
  // 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
  const deepLoopFloat = (menuList: any, newArr: any = []) => {
    menuList.forEach((item: any) => {
      // 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
      if (!item?.children?.length)
        return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
      newArr.push(
        getItem(
          item.title,
          item.path,
          addIcon(item.icon!),
          deepLoopFloat(item.children)
        )
      );
    });
    return newArr;
  };
  /**
   * 后期可以把菜单的数据从后端调接口获取
   */

  // 刷新页面菜单保持高亮
  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  return (
    <div className="layout">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            items={Items}
            selectedKeys={selectedKeys}
          />
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
