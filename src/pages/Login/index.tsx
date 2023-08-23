import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import styles from "./index.module.less";

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    localStorage.setItem("Mm", "login");
    navigate("/Home");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.containerh1}>Backend system</h1>
      <h2 className={styles.containerh2}>西湖区最具影响力的 Web 设计规范</h2>
      <Form
        name="normal_login"
        className={styles.loginForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input size="large" prefix={<UserOutlined />} placeholder="admin" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="12345"
          />
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className={styles.loginFormButton}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
