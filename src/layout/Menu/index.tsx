import { createElement, useEffect, useState } from "react";
import items from "./item";
import { Menu } from "antd";
import * as Icons from "@ant-design/icons";
import { getOpenKeys } from "@/utils/utils";
import { useLocation, Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux";

const fetchMenuFromBackend = (): Promise<any[]> => {
  return new Promise((resolve) => {
    // 模拟网络延迟
    setTimeout(() => {
      resolve(items);
    }, 100);
  });
};

export default () => {
  const [menu, setMenu] = useState<any[]>([]);
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { t } = useTranslation();
  const lange = useSelector((state: RootState) => state.language.lange);
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1)
      return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };

  // 动态渲染 Icon 图标
  const customIcons: { [key: string]: any } = Icons;
  const addIcon = (name: string) => createElement(customIcons[name]);

  // 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
  const convertToMenu2 = (menuData: any[]): any[] => {
    return menuData.map((item) => {
      const { key, icon, i18nKey, path, children } = item;

      const iconElement = addIcon(icon);
      const translatedLabel = t(i18nKey);

      const labelElement = children ? (
        translatedLabel
      ) : (
        <Link to={path}>{translatedLabel}</Link>
      );

      const menuItem = {
        key,
        icon: iconElement,
        label: labelElement,
        children: null,
      };

      if (children) {
        // @ts-ignore
        menuItem.children = convertToMenu2(children);
      }

      return menuItem;
    });
  };

  useEffect(() => {
    let isMounted = true; // 防止组件卸载后 setState

    const loadMenu = async () => {
      try {
        const rawMenu = await fetchMenuFromBackend();
        const convertedMenu = convertToMenu2(rawMenu);

        if (isMounted) {
          setMenu(convertedMenu);
        }
      } catch (error) {
        console.error("Failed to load menu:", error);
        if (isMounted) setMenu([]);
      }
    };

    loadMenu();

    return () => {
      isMounted = false;
    };
  }, [lange]);

  // 刷新页面菜单保持高亮
  useEffect(() => {
    setSelectedKeys([pathname]);
    setOpenKeys(getOpenKeys(pathname));
  }, [pathname]);

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
