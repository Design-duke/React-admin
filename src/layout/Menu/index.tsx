import { createElement, useEffect, useState, useMemo } from "react";
import items from "./item";
import { Menu } from "antd";
import * as Icons from "@ant-design/icons";
import { getOpenKeys } from "@/utils/utils";
import { useLocation, Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux";

export default () => {
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
  const menu = useMemo(() => {
    const convertToMenu2 = (menuData: any[]): any[] => {
      return menuData.map((item) => {
        const { key, icon, i18nKey, path, children } = item;

        const iconElement = addIcon(icon);
        const translatedLabel = t(i18nKey); // 自动使用当前语言翻译

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
          //@ts-ignore
          menuItem.children = convertToMenu2(children);
        }

        return menuItem;
      });
    };

    // 模拟异步加载（可选）
    // 如果你不需要延迟，可以直接 return convertToMenu2(items);
    return convertToMenu2(items);
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
