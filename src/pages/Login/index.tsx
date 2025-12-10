import { useNavigate } from "react-router";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { loginApi, registerApi } from "@/services/Auth/index";
import { setToken } from "@/utils/auth";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const onFinish = async (values: { username: string; password: string }) => {
    // console.log("Received values of form: ", values);

    try {
      if (isRegisterMode) {
        // 注册逻辑
        await registerApi(values);
        message.success("注册成功！请登录");
        setIsRegisterMode(false); // 自动切回登录
      } else {
        // 登录逻辑
        const res = await loginApi(values);
        setToken(res.data.access_token);
        message.success("登录成功");
        navigate("/Home");
      }
    } catch (error) {
      // @ts-ignore
      const msg = error?.response?.data?.message || "操作失败，请重试";
      message.error(Array.isArray(msg) ? msg[0] : msg);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-auto bg-[#f0f2f5] bg-[url(@/assets/loginBackGround.png)] bg-cover">
      <h1 className="m-0 text-[33px] font-semibold text-black/85">
        {isRegisterMode ? "注册新账号" : "Backend system"}
      </h1>
      <h2 className="mt-3 mb-6 text-[14px] text-[#848587]">
        {isRegisterMode
          ? "加入西湖区最具影响力的 Web 设计系统"
          : "西湖区最具影响力的 Web 设计规范"}
      </h2>
      <Form
        name={isRegisterMode ? "register_form" : "login_form"}
        className="h-[60vh] max-w-[500px] min-w-[328px]"
        style={{ margin: "0 auto" }}
        initialValues={{
          username: "admin",
          password: "123456",
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: isRegisterMode
                ? "请输入用户名!"
                : "Please input your Username!",
            },
            { min: 3, message: "用户名至少 3 个字符" },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder={isRegisterMode ? "请输入用户名" : "admin"}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: isRegisterMode
                ? "请输入密码!"
                : "Please input your Password!",
            },
            { min: 6, message: "密码至少 6 位" },
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder={isRegisterMode ? "请输入密码" : "123456"}
          />
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            {isRegisterMode ? "立即注册" : "登录"}
          </Button>
        </Form.Item>

        <div className="mt-4 text-center">
          {isRegisterMode ? (
            <button
              type="button"
              onClick={() => setIsRegisterMode(false)}
              className="cursor-pointer text-sm text-[#1890ff] hover:text-[#40a9ff]"
            >
              已有账号？去登录
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsRegisterMode(true)}
              className="cursor-pointer text-sm text-[#1890ff] hover:text-[#40a9ff]"
            >
              没有账号？去注册
            </button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default Login;
