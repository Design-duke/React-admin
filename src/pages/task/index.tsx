import { Table, Button, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ModelForm from "./Model";
import React, { useRef, useState } from "react";
type Props = {};

function Task({}: Props) {
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
  const dataSource = [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];

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

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />;
      <ModelForm ref={ModelFor} />
    </>
  );
}

export default Task;
