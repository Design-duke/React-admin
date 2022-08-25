import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";

const SearchForm = (props: { search: any }) => {
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
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Age" name="age">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            Search
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SearchForm;
