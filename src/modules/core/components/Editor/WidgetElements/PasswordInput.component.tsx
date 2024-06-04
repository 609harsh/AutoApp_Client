import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Space } from 'antd';

const PasswordInput: React.FC = () => {

  return (
    <Space direction="vertical">
      <Input.Password
        placeholder="input password"
        className="h-full w-full"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
    </Space>
  );
};

export default PasswordInput;