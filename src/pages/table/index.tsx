import ModelForm from "./Pop-ups/index";
import SearchForm from "./searchForm/index";
import React, { useEffect, useState } from "react";
import { message, Table, Button, Popconfirm, Space } from "antd";
import { useImmer } from "use-immer";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

// 定义表格数据类型
interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
}

const Tables: React.FC = () => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const handleSave = (values: DataType) => {
    console.log(values);
    message.success("保存成功！");
    setIsModalVisible(false);
    setEditingRecord(null);
  };

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
  const [pagination, setPagination] = useImmer({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });
  // 操作栏处理函数
  const handleAction = (type: "edit" | "delete", record: DataType) => {
    if (type === "edit") {
      setEditingRecord(record);
      setIsModalVisible(true);
    } else {
      const newData = dataSource.filter((item) => item.key !== record.key);
      setDataSource(newData);
      messageApi.success(t("Table.deleteSuccess"));
    }
  };
  // 分页变化时触发
  const handlePageChange = (page: number, pageSize: number) => {
    setPagination((draft) => {
      draft.currentPage = page;
      draft.pageSize = pageSize;
    });
    fetchData({ pageNum: page, pageSize });
  };
  // 数据获取模拟函数，需替换为真实API调用
  const fetchData = async (params: any) => {
    setLoading(true);
    // const res = await getUsersApi(params);
    // setDataSource(res.data.list);
    // setPagination(draft => {
    //   draft.total = res.data.total;
    // });
    setLoading(false);
  };

  useEffect(() => {
    // fetchData(pagination);
  }, [pagination]);

  // 定义表格列
  const columns = [
    { title: t("Table.columns.name"), dataIndex: "name", key: "name" },
    { title: t("Table.columns.age"), dataIndex: "age", key: "age" },
    { title: t("Table.columns.address"), dataIndex: "address", key: "address" },
    {
      title: t("Table.columns.operate"),
      key: "operate",
      render: (_: any, record: DataType) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleAction("edit", record)}
          />
          <Popconfirm
            title={t("Table.deleteConfirm")}
            onConfirm={() => handleAction("delete", record)}
            okText={t("Table.yes")}
            cancelText={t("Table.no")}
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <SearchForm search={fetchData} />
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="key"
        pagination={{
          ...pagination,
          onChange: handlePageChange,
        }}
        loading={loading}
      />
      <ModelForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSave={handleSave}
        initialValues={editingRecord || undefined}
      />
    </>
  );
};

export default Tables;
