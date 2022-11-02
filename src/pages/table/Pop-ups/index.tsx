import { Modal, Form, Input } from "antd";
import { useImperativeHandle, useState, forwardRef, Ref } from "react";

function Model(_props: any, ref: Ref<unknown> | undefined) {
  const { TextArea } = Input;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalOpen(false);
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const showModal = (text: any) => {
    setIsModalOpen(true);
    setTimeout(() => {
      form.setFieldsValue(text);
    }, 100);
  };

  useImperativeHandle(ref, () => {
    return { showModal };
  });

  return (
    <Modal
      title="Modal"
      destroyOnClose
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form name="basic" form={form} {...layout} preserve={false}>
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
