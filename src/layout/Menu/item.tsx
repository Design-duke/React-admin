import {
  AppstoreOutlined,
  BugOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const menu = [
  {
    key: "/Home",
    icon: <VideoCameraOutlined />,
    label: <Link to={"/Home"}>Home</Link>,
  },
  {
    key: "/subOne",
    icon: <UploadOutlined />,
    label: "Menu",
    children: [
      {
        key: "/subOne/count",
        icon: <UserOutlined />,
        label: <Link to="/subOne/count">Count</Link>,
      },
      {
        key: "/subOne/table",
        icon: <UploadOutlined />,
        label: <Link to="/subOne/table">Table</Link>,
      },
      {
        key: "/subOne/communication",
        icon: <UploadOutlined />,
        label: <Link to="/subOne/communication">Communication</Link>,
      },
    ],
  },
  {
    key: "/subTwo",
    icon: <AppstoreOutlined />,
    label: "Link",
    children: [
      {
        key: "/subTwo/link",
        icon: <BugOutlined />,
        label: <Link to="/subTwo/link">GitHub地址</Link>,
      },
    ],
  },
];
export default menu;
