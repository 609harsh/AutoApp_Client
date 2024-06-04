import { Button, Flex, Layout } from 'antd';
import { FaEye } from "react-icons/fa";
import Settings from './ComponentSettings/Settings.component';

import { useEditor } from '../../../shared/hooks/useEditor';
import { WidgetManager } from './WidgetManager/widgetManager.component';
import { useNavigate, useParams } from 'react-router-dom';

const { Sider } = Layout;

const RightPanel: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const selectedComponentId = useEditor().selectedComponentId;
  const handlePreview = () => { 
    navigate(`/app/preview/${id}`);
  }
  return (
    <Sider
      className="border-0 border-l-[1px] border-solid border-border !bg-background"
      width={300}
    >
      <Flex className="h-12 items-center justify-end border-0 border-b-[1px] border-solid border-border px-4">
        <Button className='text-[#0958d9]/75 flex justify-center items-center mr-1' onClick={handlePreview}>
          <FaEye />
        </Button>
        <Button type="primary" disabled>
          Release
        </Button>
      </Flex>
      {selectedComponentId ? <Settings /> : <WidgetManager />}
    </Sider>
  );
};

export default RightPanel;
