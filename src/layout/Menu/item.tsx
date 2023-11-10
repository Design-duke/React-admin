const menu = [
  {
    key: "/Home",
    icon: "VideoCameraOutlined",
    label: "Home",
    path: "/Home",
  },
  {
    key: "/subOne",
    icon: "UploadOutlined",
    label: "Menu",
    children: [
      {
        key: "/subOne/count",
        icon: "UserOutlined",
        label: "Count",
        path: "/subOne/count",
      },
      {
        key: "/subOne/table",
        icon: "UploadOutlined",
        label: "Table",
        path: "/subOne/table",
      },
      {
        key: "/subOne/communication",
        icon: "UploadOutlined",
        label: "Communication",
        path: "/subOne/communication",
      },
    ],
  },
  {
    key: "/subTwo",
    icon: "AppstoreOutlined",
    label: "Link",
    children: [
      {
        key: "/subTwo/link",
        icon: "BugOutlined",
        label: "GitHub地址",
        path: "/subTwo/link",
      },
    ],
  },
];

export default menu;
