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
    <div className="flex flex-col justify-center items-center h-[100vh] bg-[#f0f2f5] overflow-auto bg-[url(@/assets/loginBackGround.png)] bg-cover ">
      <h1 className="m-0 font-semibold text-[33px] text-black/85">
        Backend system
      </h1>
      <h2 className="text-[#848587] text-[14px] mt-[12px] mb-[40px]">
        西湖区最具影响力的 Web 设计规范
      </h2>
      <Form
        name="normal_login"
        className="min-w-[328px] max-w-[500px] h-[60vh]"
        style={{ margin: "0 auto" }}
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
            className="w-full"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
