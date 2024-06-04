import { Input } from 'antd';
const { TextArea } = Input;

const TextAreaElement: React.FC = () => (
  <>
    <TextArea rows={4} className="h-full w-full" />
  </>
);

export default TextAreaElement;