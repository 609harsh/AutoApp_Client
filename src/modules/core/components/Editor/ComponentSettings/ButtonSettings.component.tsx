import { Flex, Input, Typography } from 'antd';

import { useEditor } from '../../../../shared/hooks/useEditor';
import { Box } from '../../../interfaces/container.interface';

const ButtonSettings: React.FC = () => {
  const { selectedComponentId, boxes } = useEditor();

  if (!selectedComponentId) return;

  const box = boxes[selectedComponentId] as Box;

  return (
    <Flex className="h-full w-full" vertical>
      <Flex>
        <Typography className="">Button text</Typography>
        <Input type="text" value={box.name}></Input>
      </Flex>
    </Flex>
  );
};

export default ButtonSettings;
