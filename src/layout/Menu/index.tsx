import {
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
    label: <Link to={"/about"}>About</Link>,
  },
  {
    key: "/222",
    icon: <UploadOutlined />,
    label: <Link to="table">Menu</Link>,
    children: [
      {
        key: "/count",
        icon: <UserOutlined />,
        label: <Link to="count">Count</Link>,
      },
      {
        key: "/About",
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
];
export default menu;
