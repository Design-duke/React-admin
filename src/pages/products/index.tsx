import ModelForm from "./Pop-ups/index";
import SearchForm from "./searchForm/index";
import React, { useEffect, useState } from "react";
import { message, Table, Button, Popconfirm, Space } from "antd";
import { useImmer } from "use-immer";
import { useTranslation } from "react-i18next";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getDataApi } from "@/services/products/index";
import {
  addDataApi,
  updateDataApi,
  deleteDataApi,
} from "@/services/products/index";
import type { DataType } from "@/types/products/index";

const Tables: React.FC = () => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const [mode, setMode] = useState<"add" | "edit" | "">("");
  const handleSave = async (values: DataType) => {
    if (mode === "add") {
      await addDataApi(values);
    } else if (mode === "edit" && editingRecord) {
      await updateDataApi(String(editingRecord.id), values);
      fetchData();
    }

    message.success("保存成功！");
    setIsModalVisible(false);
    setMode("");
    setEditingRecord(null);
  };

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [pagination, setPagination] = useImmer({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });
  // 操作栏处理函数
  const handleAction = async (type: "edit" | "delete", record: DataType) => {
    if (type === "edit") {
      setEditingRecord(record);
      setIsModalVisible(true);
      setMode("edit");
    } else {
      await deleteDataApi(String(record.id));
      fetchData();
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
  const fetchData = async (params?: any) => {
    setLoading(true);
    const res = await getDataApi();
    setDataSource(res.data);
    setPagination((draft) => {
      draft.total = res.data.total;
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchData(pagination);
  }, [pagination]);

  // 定义表格列
  const columns = [
    { title: t("Table.columns.name"), dataIndex: "name", key: "name" },
    { title: "sku", dataIndex: "sku", key: "sku" },
    { title: "价格", dataIndex: "price", key: "price" },
    { title: "图片", dataIndex: "image", key: "image" },
    { title: "描述", dataIndex: "description", key: "description" },
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
            title="确认删除"
            description="你确定删除该条数据吗？"
            onConfirm={() => handleAction("delete", record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const add = () => {
    setMode("add");
    setIsModalVisible(true);
  };

  return (
    <>
      {contextHolder}
      <SearchForm search={fetchData} add={add} />
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
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
