import { Flex, Typography } from 'antd';
import { IoIosSettings } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';

import { useAppDispatch } from '../../../shared/hooks/useAppDispatch';
import { Box } from '../../interfaces/container.interface';
import { deleteBox, setSelectedComponentId } from '../../reducers/editor.reducer';

type BoxOptionsProps = {
  box: Box;
};

const { Text } = Typography;

const BoxOptions: React.FC<BoxOptionsProps> = ({ box }) => {
  const dispatch = useAppDispatch();

  function handleSetSelectedComponentId(componentId: string) {
    dispatch(setSelectedComponentId(componentId));
  }

  function handleDeleteBox(componentId: string) {
    dispatch(deleteBox(componentId));
  }

  return (
    <Flex
      justify="space-between"
      align="center"
      className="absolute -left-1 -top-[34px] h-6 min-w-32 max-w-80 gap-4 rounded-md bg-background px-1"
    >
      <Text className="line-clamp-1 max-w-20 truncate text-xs font-medium text-primary">
        {box.name}
      </Text>
      <Flex align="center" className="gap-[2px]">
        <IoIosSettings
          className="cursor-pointer text-primary hover:text-mutedForeground"
          onClick={() => handleSetSelectedComponentId(box.id)}
        />
        <MdDelete
          className="cursor-pointer text-red-500 hover:text-red-300"
          onClick={() => handleDeleteBox(box.id)}
        />
      </Flex>
    </Flex>
  );
};

export default BoxOptions;
