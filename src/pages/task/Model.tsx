import { Modal, Form, Input } from "antd";
import { useImperativeHandle, useState, forwardRef, Ref } from "react";

function Model(props: any, ref: Ref<unknown> | undefined) {
  const showModal = (text: any) => {
    setIsModalVisible(true);
    form.setFieldsValue(text);
  };
  useImperativeHandle(ref, () => {
    return { showModal };
  });
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const handleOk = () => {
    setIsModalVisible(false);
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  return (
    <Modal
      title="Modal"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        form={form}
        {...layout}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item label="key" name="key" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="age"
          name="age"
          rules={[{ required: true, message: "Please input your age!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default forwardRef(Model);
