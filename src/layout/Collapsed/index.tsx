import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import "./index.less";

function Header(props: { collapsed: any; setCollapsed: any }) {
  const { collapsed, setCollapsed } = props;
  return (
    <div className="trigger" onClick={() => setCollapsed(!collapsed)}>
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  );
}

export default Header;
