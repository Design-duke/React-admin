import { Modal, Form, Input } from "antd";
import { useImperativeHandle, forwardRef, useState } from "react";

interface ModalFormData {
  key: number;
  name: string;
  age: number;
  address: string;
}

interface ModalFormRef {
  showModal: (initialValues: Partial<ModalFormData>) => void;
}

const ModalForm = forwardRef<ModalFormRef>((_, ref) => {
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

  useImperativeHandle(ref, () => ({
    showModal,
  }));

  return (
    <Modal
      title="Modal"
      destroyOnClose
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="modalForm"
        form={form}
        {...layout}
        initialValues={{ key: "" }} // 如果需要的话
      >
        {/* Hidden field for key */}
        <Form.Item name="key" noStyle>
          <Input hidden />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please input your age!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default ModalForm;
