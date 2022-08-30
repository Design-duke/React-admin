import {
  AppstoreOutlined,
  BugOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const menu = [
  // {
  //   key: "/",
  //   icon: <UserOutlined />,
  //   label: <Link to={"/"}>Home</Link>,
  // },
  {
    key: "/Home",
    icon: <VideoCameraOutlined />,
    label: <Link to={"/Home"}>Home</Link>,
  },
  {
    key: "/222",
    icon: <UploadOutlined />,
    label: "Menu",
    children: [
      {
        key: "/count",
        icon: <UserOutlined />,
        label: <Link to="count">Count</Link>,
      },
      {
        key: "/table",
        icon: <UploadOutlined />,
        label: <Link to="table">Table</Link>,
      },
      {
        key: "/communication",
        icon: <UploadOutlined />,
        label: <Link to="communication">Communication</Link>,
      },
    ],
  },
  {
    key: "/1123link",
    icon: <AppstoreOutlined />,
    label: "Link",
    children: [
      {
        key: "link",
        icon: <BugOutlined />,
        label: <Link to="link">GitHub地址</Link>,
      },
    ],
  },
];
export default menu;
