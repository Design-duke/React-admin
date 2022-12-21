import ModelForm from "./Pop-ups/index";
import SearchForm from "./searchForm/index";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Button, message, Popconfirm, Space } from "antd";

function Tables() {
  const { t } = useTranslation();
  const ModelFor: any = useRef(null);
  const confirm = (text: any, record: any, index: any) => {
    const newData = dataSource.filter((item) => item.key !== record.key);
    setDataSource(newData);
    message.success("Click on Yes");
  };
  const cancel = () => {
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
  const [loading, setLoading] = useState(false);
  const pageOnchange = (val: any) => {
    setPagination({
      currentPage: val.current,
      pageSize: val.pageSize,
      total: val.total,
    });
    request({
      currentPage: val.current,
      pageSize: val.pageSize,
    });
  };
  const [pagination, setPagination] = useState({
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
    // const res = await getStoreInfoApi(params);
    // setDataSource(res.data.list);
    // setPagination({
    //   ...pagination,
    //   currentPage: res.data.pageNum,
    //   total: res.data.total,
    // });
    setLoading(false);
  };
  useEffect(() => {
    request(pagination);
  }, []);

  return (
    <>
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
