import { Button, Card, Dropdown, Flex, Skeleton, Typography } from 'antd';
import { FaRegEdit } from 'react-icons/fa';
import { TbDotsVertical } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { appCardDropdownComponents } from '../../constants/dashboard.constants';
import { AppType } from '../../interfaces/dashboard.interface';
import RenderIcon from '../RenderIcon/RenderIcon.component';

type Props = {
  app: AppType;
  updatingAppId: string;
  openModalWithMethod: ({
    method,
    appId
  }: {
    method: 'createApp' | 'renameApp' | 'changeIcon' | 'deleteApp';
    appId: string | null;
  }) => void;
};

const { Paragraph } = Typography;

const AppCard: React.FC<Props> = ({ app, updatingAppId, openModalWithMethod }) => {
  const navigate = useNavigate();

  function handleDropdownClick(e: any, id: string) {
    if (e.key === '1') {
      openModalWithMethod({
        method: 'renameApp',
        appId: id
      });
    } else if (e.key === '2') {
      openModalWithMethod({
        method: 'changeIcon',
        appId: id
      });
    } else if (e.key === '3') {
      openModalWithMethod({
        method: 'deleteApp',
        appId: id
      });
    }
  }

  return (
    <Card
      key={app.id}
      className="shrink-0 border-border shadow-sm"
      loading={app.id === updatingAppId}
    >
      <Flex vertical className="gap-8">
        <Flex justify="space-between" align="flex-start" className="w-full">
          <Flex className="rounded-md bg-blue-50">
            {app.id === updatingAppId ? (
              <Skeleton.Image active className="!h-8 !w-8" />
            ) : (
              <RenderIcon name={app.icon} />
            )}
          </Flex>
          <Dropdown
            menu={{
              onClick: (e) => handleDropdownClick(e, app.id),
              items: appCardDropdownComponents
            }}
            placement="bottomLeft"
            arrow
            trigger={['click']}
          >
            <Flex className="items-center justify-center rounded-md p-[1px] py-[4px] transition duration-200 ease-in-out hover:bg-blue-50/80">
              <TbDotsVertical className="cursor-pointer text-xl" />
            </Flex>
          </Dropdown>
        </Flex>
        <Flex justify="space-between" align="flex-end" className="gap-5">
          <Paragraph className="!m-0 line-clamp-1 text-xl font-bold tracking-tight text-foreground/70">
            {app.name}
          </Paragraph>
          <Button
            type="primary"
            size="small"
            className="flex items-center !px-3 !py-3"
            onClick={() => navigate(`/app/editor/${app.id}?version=v1&env=development`)}
            icon={<FaRegEdit className="!m-0 !mb-[2px] !p-0" />}
          >
            Edit
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default AppCard;
