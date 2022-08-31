import { Table, Button, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ModelForm from "./Pop-ups/index";
import SearchForm from "./searchForm/index";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
function Tables() {
  const { t } = useTranslation();
  const ModelFor: any = useRef(null);
  const confirm = (e: any) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e: any) => {
    console.log(e);
    message.error("Click on No");
  };
  const handleEdit = (text: any, record: any, index: any) => {
    ModelFor.current.showModal(text);
  };
  interface DataType {
    key: number;
    name: string;
    age: number;
    address: string;
  }
  const [dataSource, setdataSource] = useState<DataType[]>([]);
  const columns = [
    {
      title: t("Table.columns.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("Table.columns.age"),
      dataIndex: "age",
      key: "age",
    },
    {
      title: t("Table.columns.address"),
      dataIndex: "address",
      key: "address",
    },
    {
      title: t("Table.columns.operate"),
      key: "操作",
      render: (text: any, record: any, index: any) => (
        <>
          <Button
            type="primary"
            style={{ marginRight: "5px" }}
            icon={<EditOutlined />}
            onClick={() => handleEdit(text, record, index)}
          ></Button>{" "}
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  // [
  //   {
  //     key: 1,
  //     name: "胡彦斌",
  //     age: Math.floor(Math.random() * 100),
  //     address: "西湖区湖底公园1号",
  //   },
  //   {
  //     key: 2,
  //     name: "胡彦祖",
  //     age: Math.floor(Math.random() * 100),
  //     address: "西湖区湖底公园1号",
  //   },
  // ]
  const request = () => {
    const arr = ["王", "赵", "孙", "李"];
    setdataSource(() =>
      Array.from({ length: 12 }).map((_item, index) => ({
        key: index,
        name: arr[Math.floor(Math.random() * 4)],
        age: Math.floor(Math.random() * 100),
        address: `西湖区湖底公园${index}号`,
      }))
    );
  };
  useEffect(() => {
    request();
  }, []);

  return (
    <>
      <SearchForm search={request} />
      <Table dataSource={dataSource} columns={columns} />;
      <ModelForm ref={ModelFor} />
    </>
  );
}

export default Tables;
