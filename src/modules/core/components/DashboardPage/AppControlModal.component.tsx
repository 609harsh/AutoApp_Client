import React, { useState } from 'react';
import { App, Button, Flex, Input, Modal, Typography } from 'antd';

import {
  useChangeIconMutation,
  useCreateAppMutation,
  useDeleteAppMutation,
  useRenameAppMutation
} from '../../../shared/apis/appApi';
import { appIcons } from '../../constants/dashboard.constants';

type AppControlModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
  appMethod: string;
  selectedAppId: string;
  setSelectedAppId: (state: string) => void;
  setUpdatingAppId: (state: string) => void;
};

const { Paragraph } = Typography;

const AppControlModal: React.FC<AppControlModalProps> = ({
  appMethod,
  isModalOpen,
  selectedAppId,
  setSelectedAppId,
  setUpdatingAppId,
  setIsModalOpen
}) => {
  const [appName, setAppName] = useState<string>('');
  const [appIconName, setAppIconName] = useState<string>('');

  const { message } = App.useApp();

  const [createNewApp, { isLoading: isAppCreating }] = useCreateAppMutation();
  const [renameAppMutation, { isLoading: isAppRenaming }] = useRenameAppMutation();
  const [deleteAppMutation, { isLoading: isAppDeleting }] = useDeleteAppMutation();
  const [changeIconMutation, { isLoading: isIconLoading }] = useChangeIconMutation();

  function getTitle(method: string) {
    switch (method) {
      case 'createApp':
        return 'Create App';
      case 'renameApp':
        return 'Rename App';
      case 'changeIcon':
        return 'Change Icon';
      case 'deleteApp':
        return 'Delete App';
    }
  }

  const title = getTitle(appMethod);

  function closeModal() {
    setUpdatingAppId('');
    setSelectedAppId('');
    setAppName('');
    setIsModalOpen(false);
  }

  function handleCreateApp() {
    if (appName === '') {
      message.error('Please enter a valid name');
      return;
    }
    createNewApp(appName)
      .unwrap()
      .then(() => {
        setAppName('');
        closeModal();
      })
      .catch((error) => {
        if (error) {
          if ('data' in error) {
            message.error(error.data.message);
          }
        }
      });
  }

  function renameApp(appId: string) {
    if (appName === '') {
      message.error('Please enter a valid name');
      return;
    }

    setUpdatingAppId(appId);

    renameAppMutation({
      appId,
      appName
    })
      .unwrap()
      .then(() => {
        closeModal();
        setUpdatingAppId('');
        setSelectedAppId('');
        setAppName('');
      })
      .catch((error) => {
        if (error) {
          if ('data' in error) {
            message.error(error.data.message);
          }
        }
      });
  }

  function changeIcon(appId: string) {
    setUpdatingAppId(appId);
    changeIconMutation({ icon: appIconName, id: appId })
      .unwrap()
      .then(() => {
        closeModal();
        setUpdatingAppId('');
        setSelectedAppId('');
        setAppIconName('');
      })
      .catch((error) => {
        if (error) {
          if ('data' in error) {
            message.error(error.data.message);
          }
        }
      });
  }

  function deleteApp(appId: string) {
    setUpdatingAppId(appId);
    deleteAppMutation(appId)
      .unwrap()
      .then(() => {
        closeModal();
        setSelectedAppId('');
        setUpdatingAppId('');
      })
      .catch((error) => {
        if (error) {
          if ('data' in error) {
            message.error(error.data.message);
          }
        }
      });
  }

  let footer = null;

  if (appMethod === 'renameApp')
    footer = [
      <Button key="back" danger onClick={closeModal}>
        Cancel
      </Button>,
      <Button type="primary" onClick={() => renameApp(selectedAppId)} loading={isAppRenaming}>
        Rename
      </Button>
    ];
  else if (appMethod === 'createApp')
    footer = [
      <Button key="back" danger onClick={closeModal}>
        Cancel
      </Button>,
      <Button type="primary" onClick={handleCreateApp} loading={isAppCreating}>
        Create App
      </Button>
    ];
  else if (appMethod === 'deleteApp')
    footer = [
      <Button key="back" onClick={closeModal}>
        Cancel
      </Button>,
      <Button
        type="primary"
        danger
        onClick={() => deleteApp(selectedAppId)}
        loading={isAppDeleting}
      >
        Delete
      </Button>
    ];
  else if (appMethod === 'changeIcon')
    footer = [
      <Button key="back" danger onClick={closeModal}>
        Cancel
      </Button>,
      <Button type="primary" onClick={() => changeIcon(selectedAppId)} loading={isIconLoading}>
        Change Icon
      </Button>
    ];

  let content: JSX.Element = <></>;

  if (appMethod === 'createApp') {
    content = (
      <Input
        placeholder="Enter new name"
        value={appName}
        onChange={(e) => setAppName(e.target.value)}
      />
    );
  } else if (appMethod === 'deleteApp') {
    content = (
      <Paragraph className="text-base font-medium text-mutedForeground">Are you sure?</Paragraph>
    );
  } else if (appMethod === 'renameApp') {
    content = (
      <Input
        placeholder="Enter name"
        value={appName}
        onChange={(e) => setAppName(e.target.value)}
      />
    );
  } else if (appMethod === 'changeIcon') {
    content = (
      <Flex className="my-6 w-full gap-y-3" justify="space-between" wrap="wrap">
        {appIcons.map((icon) => {
          return (
            <Flex
              className={`w-[30%] border-[1px] border-solid border-border py-8 text-5xl text-primary hover:bg-secondary ${
                appIconName === icon.name && 'bg-secondary'
              }`}
              justify="center"
              align="center"
              key={icon.name}
              onClick={() => setAppIconName(icon.name)}
            >
              {icon.icon}
            </Flex>
          );
        })}
      </Flex>
    );
  }

  return (
    <Modal open={isModalOpen} title={title} onCancel={closeModal} footer={footer}>
      {content}
    </Modal>
  );
};

export default AppControlModal;
