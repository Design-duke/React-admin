import ModelForm from "./Pop-ups/index";
import SearchForm from "./searchForm/index";
import { useImmer } from "use-immer";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Button, message, Popconfirm, Space } from "antd";

function Tables() {
  const { t } = useTranslation();
  const ModelFor: any = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const confirm = (text: any, record: any, index: any) => {
    const newData = dataSource.filter((item) => item.key !== record.key);
    setDataSource(newData);
    messageApi.success("Click on Yes");
  };
  const cancel = () => {
    messageApi.error("Click on No");
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
  const [loading, setLoading] = useState(false);
  const pageOnchange = (value: any) => {
    setPagination((v) => {
      v.currentPage = value.current;
      v.pageSize = value.pageSize;
    });
    request({
      currentPage: value.current,
      pageSize: value.pageSize,
    });
  };
  const [pagination, setPagination] = useImmer({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: 1,
      name: "小明",
      age: 26,
      address: "浙江省杭州市西湖区西溪路",
    },
    {
      key: 2,
      name: "老王",
      age: 30,
      address: "浙江省杭州市西湖区西溪路隔壁",
    },
  ]);
  const columns = [
    {
      title: t("Table.columns.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("Table.columns.age"),
      dataIndex: "age",
      key: "2",
    },
    {
      title: t("Table.columns.address"),
      dataIndex: "address",
      key: "3",
    },
    {
      title: t("Table.columns.operate"),
      key: "操作",
      render: (text: any, record: any, index: any) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(text, record, index)}
          />

          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => confirm(text, record, index)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const request = async (params: any) => {
    setLoading(true);
    // const res = await getUsersApi(params);
    // setDataSource(res.data.list);
    // setPagination((v) => {
    //   v.currentPage = res.data.pageNum;
    //   v.total = res.data.total;
    // });
    setLoading(false);
  };
  useEffect(() => {
    request(pagination);
  }, []);

  return (
    <>
      {contextHolder}
      <SearchForm search={request} />
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(row: any) => row.key}
        pagination={pagination}
        onChange={pageOnchange}
        loading={loading}
      />
      <ModelForm ref={ModelFor} />
    </>
  );
}

export default Tables;
