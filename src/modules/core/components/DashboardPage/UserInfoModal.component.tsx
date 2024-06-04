import React from 'react';
import { Avatar, Flex, Modal, Typography } from 'antd';

import { useAuth } from '../../../shared/hooks/useAuth';

type UserInfoModalProps = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

const { Title, Paragraph } = Typography;

const UserInfoModal: React.FC<UserInfoModalProps> = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <Modal open={isOpen} title="Profile Settings" onCancel={handleCloseModal} footer={null}>
      <Flex>
        <Flex flex={1} justify="center" align="center">
          <Avatar
            className="flex h-20 w-20 items-center justify-center text-2xl font-semibold transition delay-100 ease-in-out hover:scale-110"
            style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
          >
            {user.username?.substring(0, 1)}
          </Avatar>
        </Flex>
        <Flex vertical flex={1}>
          <Flex vertical className="border-0 border-b-[1px] border-solid border-border pb-2">
            <Title className="!m-0 !text-base font-medium text-foreground">Display Name</Title>
            <Paragraph className="!m-0 font-medium text-mutedForeground">{user.username}</Paragraph>
          </Flex>
          <Flex vertical className="border-0 border-b-[1px] border-solid border-border pb-2 pt-4">
            <Title className="!m-0 !text-base font-medium text-foreground">Email Address</Title>
            <Paragraph className="!m-0 font-medium text-mutedForeground">{user.email}</Paragraph>
          </Flex>
          <Flex vertical className="border-0 border-b-[1px] border-solid border-border pb-2 pt-4">
            <Title className="!m-0 !text-base font-medium text-foreground">Phone Number</Title>
            <Paragraph className="!m-0 font-medium text-mutedForeground">
              {user.phoneNumber || 'No Data'}
            </Paragraph>
          </Flex>
          <Flex vertical className="border-0 border-solid border-border pb-2 pt-4">
            <Title className="!m-0 !text-base font-medium text-foreground">Company</Title>
            <Paragraph className="!m-0 font-medium text-mutedForeground">
              {user.company || 'No Data'}
            </Paragraph>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default UserInfoModal;
