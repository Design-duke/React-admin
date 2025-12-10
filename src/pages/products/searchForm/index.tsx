import { useTranslation } from "react-i18next";
import { Button, Card, Form, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useCallback } from "react";

interface SearchFormProps {
  search: (values: { name?: string; age?: string }) => void;
  add: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ search, add }) => {
  const { t } = useTranslation();

  const onFinish = useCallback(
    (values: { name?: string; age?: string }) => {
      console.log("Search successful with values:", values);
      search(values);
    },
    [search]
  );

  const onFinishFailed = (errorInfo: any) => {
    console.error("Search failed:", errorInfo);
  };

  const formItems = [
    {
      label: t("Table.searchForm.name"),
      name: "name",
    },
  ];

  const addClick = () => {
    add();
  };

  return (
    <Card>
      <Form layout="inline" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        {formItems.map(({ label, name }) => (
          <Form.Item label={label} name={name} key={name}>
            <Input />
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            {t("Table.searchForm.searchButton")}
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            onClick={addClick}
            type="primary"
            icon={<PlusOutlined />}
          ></Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SearchForm;
