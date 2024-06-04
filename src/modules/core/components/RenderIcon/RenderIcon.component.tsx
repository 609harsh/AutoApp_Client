import { Flex } from 'antd';
import { MdEmail } from 'react-icons/md';

import { appIcons } from '../../constants/dashboard.constants';

type Props = {
  name: string;
};

const RenderIcon: React.FC<Props> = ({ name }) => {
  let icon = appIcons.find((item) => item.name === name);
  return (
    <>
      <Flex className="p-2 text-3xl text-[#0958d9]/70">
        {!name && <MdEmail />}
        {name && icon?.icon}
      </Flex>
    </>
  );
};

export default RenderIcon;
