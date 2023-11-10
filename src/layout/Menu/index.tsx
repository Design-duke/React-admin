import Items from "./item";
import { Menu } from "antd";
import * as Icons from "@ant-design/icons";
import { getOpenKeys } from "@/utils/utils";
import { useLocation, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default () => {
  const { pathname } = useLocation();
  const [menu, setMenu] = useState<any>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1)
      return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };

  // 动态渲染 Icon 图标
  const customIcons: { [key: string]: any } = Icons;
  const addIcon = (name: string) => React.createElement(customIcons[name]);

  // 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
  const convertToMenu2 = (menuData: any[]) => {
    return menuData.map((item) => {
      const { key, icon, label, path, children } = item;

      const iconElement = addIcon(icon);
      const labelElement = children ? label : <Link to={path}>{label}</Link>;

      const menuItem = {
        key,
        icon: iconElement,
        label: labelElement,
        children: null,
      };

      if (children) {
        //@ts-ignore
        menuItem.children = convertToMenu2(children);
      }

      return menuItem;
    });
  };

  // 刷新页面菜单保持高亮
  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  useEffect(() => {
    setOpenKeys(getOpenKeys(pathname));
    // 后期可以把菜单的数据从后端调接口获取
    setTimeout(() => {
      const item = convertToMenu2(Items);
      setMenu(item);
    }, 1000);
  }, []);

  return (
    <Menu
      theme="dark"
      mode="inline"
      items={menu}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    />
  );
};
