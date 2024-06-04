import { SyntheticEvent, useState } from 'react';
import { Avatar, Dropdown, Flex, Layout, MenuProps, Typography } from 'antd';

import { logout } from '../../../authentication/reducers';
import { useAppDispatch } from '../../../shared/hooks/useAppDispatch';
import { useAuth } from '../../../shared/hooks/useAuth';
import UserInfoModal from './UserInfoModal.component';

const { Header } = Layout;
const { Paragraph } = Typography;

const DashboardHeader: React.FC = () => {
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState<boolean>(false);
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const items: MenuProps['items'] = [
    {
      key: 'profile-menu-name',
      label: (
        <span className="flex flex-col">
          <span className="font-semibold text-foreground">{user.username}</span>
          <span className="text-mutedForeground">{user.email}</span>
        </span>
      )
    },
    {
      type: 'divider'
    },
    {
      key: 'profile-settings',
      label: <span className="font-medium text-foreground">View User Profile</span>
    },
    {
      type: 'divider'
    },
    {
      label: <span className="font-medium text-red-400">Log Out</span>,
      key: 'logout'
    }
  ];

  const onClick = ({ key }: { key: string }) => {
    if (key === 'profile-settings') {
      setIsUserInfoModalOpen(true);
    }
    if (key === 'logout') {
      dispatch(logout());
    }
  };

  return (
    <>
      <Header className="flex max-h-12 w-full items-center border-0 border-b-[1px] border-solid border-border bg-background px-6">
        <Flex className="w-full" align="center" justify="space-between">
          <Paragraph className="!m-0 !text-base font-semibold text-foreground">All Apps</Paragraph>

          <Dropdown menu={{ items, onClick }} trigger={['click']}>
            <div
              onClick={(event: SyntheticEvent) => {
                event.preventDefault();
              }}
              className="flex cursor-pointer items-center"
            >
              <Avatar
                className="transition delay-100 ease-in-out hover:scale-110"
                style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
              >
                {user.username?.substring(0, 1)}
              </Avatar>
            </div>
          </Dropdown>
        </Flex>
      </Header>
      <UserInfoModal isOpen={isUserInfoModalOpen} setIsOpen={setIsUserInfoModalOpen} />
    </>
  );
};

export default DashboardHeader;
