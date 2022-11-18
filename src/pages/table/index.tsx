import { Table, Button, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ModelForm from "./Pop-ups/index";
import SearchForm from "./searchForm/index";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStoreInfoApi } from "@/services";

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
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const columns = [
    {
      title: t("Table.columns.name"),
      key: "name",
      render: (prop: any, row: any, index: any) => (
        <>{row.id + "-" + row.name}</>
      ),
    },
    {
      title: t("Table.columns.age"),
      dataIndex: "phone",
      key: "2",
    },
    {
      title: t("Table.columns.address"),
      dataIndex: "email",
      key: "3",
    },
    {
      title: t("Table.columns.operate"),
      key: "操作",
      render: (text: any, record: any, index: any) => (
        <>
          <Button
            type="primary"
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
        rowKey={(row: any) => row.id}
        pagination={pagination}
        onChange={pageOnchange}
        loading={loading}
      />
      <ModelForm ref={ModelFor} />
    </>
  );
}

export default Tables;
