import { Button, Card, Flex, Typography } from 'antd';
import { HiPlus } from 'react-icons/hi2';

const { Paragraph, Title } = Typography;

type WelcomeCardProps = {
  openModalWithMethod: ({
    method,
    appId
  }: {
    method: 'createApp' | 'renameApp' | 'changeIcon' | 'deleteApp';
    appId?: string | null;
  }) => void;
};

const WelcomeCard: React.FC<WelcomeCardProps> = ({ openModalWithMethod }) => {
  return (
    <Card className="mt-10 w-full max-w-4xl border-border py-10 shadow-sm">
      <Flex vertical align="center" justify="center" className="w-full text-center">
        <Title className="!text-4xl !font-bold tracking-tight">
          Welcome to your new Workspace!
        </Title>
        <Paragraph className="!text-lg font-normal text-mutedForeground">
          You can get started by creating a new application
        </Paragraph>
        <Button
          type="primary"
          icon={<HiPlus className="!m-0 !p-0 text-base" />}
          className="mt-3 flex items-center "
          onClick={() => {
            openModalWithMethod({ method: 'createApp' });
          }}
        >
          Create New App
        </Button>
      </Flex>
    </Card>
  );
};

export default WelcomeCard;
