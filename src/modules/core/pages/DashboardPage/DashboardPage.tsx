import { useState } from 'react';
import { App, Flex, Layout } from 'antd';

import { useGetAllAppsQuery } from '../../../shared/apis/appApi';
import AppCardsList from '../../components/DashboardPage/AppCardsList.component';
import AppControlModal from '../../components/DashboardPage/AppControlModal.component';
import AppControlPanel from '../../components/DashboardPage/AppControlPanel.component';
import CardsLoader from '../../components/DashboardPage/CardsLoader.component';
import DashboardHeader from '../../components/DashboardPage/DashboardHeader.component';
import WelcomeCard from '../../components/DashboardPage/WelcomeCard.component';
import LeftPanel from '../../components/Editor/LeftPanel.component';

const { Content } = Layout;

const DashboardPage: React.FC = () => {
  const [isAppControlModalOpen, setIsAppControlModalOpen] = useState<boolean>(false);
  const [appmethod, setAppMethod] = useState<string>('');
  const [selectedAppId, setSelectedAppId] = useState<string>('');
  const [updatingAppId, setUpdatingAppId] = useState<string>('');

  const { message } = App.useApp();

  function openModalWithMethod({
    method,
    appId = null
  }: {
    method: 'createApp' | 'renameApp' | 'changeIcon' | 'deleteApp';
    appId?: string | null;
  }) {
    setAppMethod(method);
    if (appId && (method === 'changeIcon' || method === 'deleteApp' || method === 'renameApp')) {
      setSelectedAppId(appId);
    }
    setIsAppControlModalOpen(true);
  }

  const { data: apps = [], isLoading, isFetching, isError, error } = useGetAllAppsQuery();

  if (isError) {
    if ('data' in error) {
      message.error(error.data.message);
    }
  }

  return (
    <Layout className="min-h-screen">
      <LeftPanel />
      <Layout>
        <DashboardHeader />
        <Content className="flex w-full justify-center bg-background/5">
          <Flex vertical className="container h-full" gap="large">
            <AppControlPanel apps={apps} openModalWithMethod={openModalWithMethod} />
            <Flex className="w-full justify-center p-4 md:px-20">
              {isLoading && isFetching ? (
                <CardsLoader />
              ) : apps.length === 0 ? (
                <WelcomeCard openModalWithMethod={openModalWithMethod} />
              ) : (
                <AppCardsList
                  apps={apps}
                  updatingAppId={updatingAppId}
                  openModalWithMethod={openModalWithMethod}
                />
              )}
            </Flex>

            <AppControlModal
              appMethod={appmethod}
              isModalOpen={isAppControlModalOpen}
              selectedAppId={selectedAppId}
              setUpdatingAppId={setUpdatingAppId}
              setSelectedAppId={setSelectedAppId}
              setIsModalOpen={setIsAppControlModalOpen}
            />
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
