import { Flex } from 'antd';

import { AppType } from '../../interfaces/dashboard.interface';
import AppCard from './AppCard.component';

type AppCardsListProps = {
  apps: AppType[];
  updatingAppId: string;
  openModalWithMethod: ({
    method,
    appId
  }: {
    method: 'createApp' | 'renameApp' | 'changeIcon' | 'deleteApp';
    appId?: string | null;
  }) => void;
};

const AppCardsList: React.FC<AppCardsListProps> = ({
  apps,
  updatingAppId,
  openModalWithMethod
}) => {
  return (
    <Flex className="grid w-full grid-cols-1 gap-10 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {apps.map((app) => (
        <AppCard
          key={app.id}
          app={app}
          updatingAppId={updatingAppId}
          openModalWithMethod={openModalWithMethod}
        />
      ))}
    </Flex>
  );
};

export default AppCardsList;
