import { Typography } from 'antd';
import { BiSolidSave } from 'react-icons/bi';
import { BsStack } from 'react-icons/bs';
import { FaShareAlt } from 'react-icons/fa';
import { HiMiniChatBubbleBottomCenter } from 'react-icons/hi2';
import { MdEmail, MdOutlineDriveFolderUpload } from 'react-icons/md';
import { PiCirclesFourFill, PiRobotFill } from 'react-icons/pi';
import { RiAppsFill } from 'react-icons/ri';

import { itemType } from '../interfaces/dashboard.interface';

export const appCardDropdownComponents: itemType[] = [
  {
    key: '1',
    label: <Typography>Rename app</Typography>
  },
  {
    key: '2',
    label: <Typography>Change icon</Typography>
  },
  {
    key: '3',
    label: <Typography className="text-[#ff0000]">Delete app</Typography>
  }
];

export const appIcons = [
  {
    name: 'email',
    icon: <MdEmail />
  },
  {
    name: 'circles',
    icon: <PiCirclesFourFill />
  },
  {
    name: 'save',
    icon: <BiSolidSave />
  },
  {
    name: 'stack',
    icon: <BsStack />
  },
  {
    name: 'apps',
    icon: <RiAppsFill />
  },
  {
    name: 'share',
    icon: <FaShareAlt />
  },
  {
    name: 'upload',
    icon: <MdOutlineDriveFolderUpload />
  },
  {
    name: 'chat',
    icon: <HiMiniChatBubbleBottomCenter />
  },
  {
    name: 'bot',
    icon: <PiRobotFill />
  }
];
