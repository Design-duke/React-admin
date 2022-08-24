import { Button, Form, Input } from "antd";

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
    <Form layout={"inline"} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item label="Age" name="age">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
