import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./index.less";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    localStorage.setItem("Mm", "login");
    navigate("/about");
  };

  return (
    <div className="container">
      <h1
        style={{
          color: "rgba(0, 0, 0, 0.85)",
          fontWeight: 600,
          fontSize: "33px",
          margin: 0,
        }}
      >
        Backend system
      </h1>
      <h2
        style={{
          color: "rgb(132, 133, 135)",
          fontSize: "14px",
          marginTop: "12px",
          marginBottom: "40px",
        }}
      >
        西湖区最具影响力的 Web 设计规范
      </h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
