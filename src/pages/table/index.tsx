import { Table, Button, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ModelForm from "./Pop-ups/index";
import SearchForm from "./searchForm/index";
import { useEffect, useRef, useState } from "react";

function Tables() {
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
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "操作",
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
  const request = () => {
    setdataSource(() => [
      {
        key: 1,
        name: "胡彦斌",
        age: Math.floor(Math.random() * 100),
        address: "西湖区湖底公园1号",
      },
      {
        key: 2,
        name: "胡彦祖",
        age: Math.floor(Math.random() * 100),
        address: "西湖区湖底公园1号",
      },
    ]);
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
