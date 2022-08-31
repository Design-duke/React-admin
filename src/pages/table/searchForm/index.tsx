import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { useTranslation } from "react-i18next";

const SearchForm = (props: { search: any }) => {
  const { t } = useTranslation();
  const { search } = props;
  const onFinish = (values: any) => {
    console.log("Success:", values);
    search();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Card bordered={false}>
      <Form
        layout={"inline"}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label={t("Table.searchForm.name")} name="name">
          <Input />
        </Form.Item>
        <Form.Item label={t("Table.searchForm.age")} name="age">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            {t("Table.searchForm.searchButton")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SearchForm;
