import { Modal, Form, Input } from "antd";
import { useEffect } from "react";

const { TextArea } = Input;

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
}
interface ModelFormProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (values: any) => void;
  initialValues?: Partial<DataType>;
}
const ModalForm: React.FC<ModelFormProps> = ({
  visible,
  onCancel,
  onSave,
  initialValues,
}) => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave(values);
      form.resetFields();
    } catch (error) {
      console.log("表单验证失败:", error);
    }
  };

  const handleCancelWrapper = () => {
    form.resetFields();
    onCancel();
  };

  useEffect(() => {
    if (visible) {
      form.resetFields(); // 先重置
      if (initialValues) {
        form.setFieldsValue(initialValues); // 设置初始值
      }
    }
  }, [visible, initialValues, form]);

  return (
    <Modal
      title="Modal"
      destroyOnHidden
      open={visible}
      onOk={handleOk}
      onCancel={handleCancelWrapper}
    >
      <Form
        name="modalForm"
        form={form}
        {...layout}
        initialValues={{ key: "id" }} // 如果需要的话
      >
        {/* Hidden field for key */}
        <Form.Item name="id" noStyle>
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
          label="价格"
          name="price"
          rules={[{ required: true, message: "Please input your price!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="sku"
          name="sku"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label="图片"
          name="image"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label="描述"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
