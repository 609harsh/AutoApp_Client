import { Button, Flex, Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import hero from '../../../../assets/hero.png';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const LandingPageHero: React.FC = () => {
  const navigate = useNavigate();

  function navigateToAppPage() {
    navigate('/app');
  }

  return (
    <Content className="flex justify-center bg-background/90">
      <Flex vertical className="container my-16 gap-14 p-4" align="center">
        <Flex vertical align="center" className="w-full max-w-2xl text-center">
          <Title className="!text-5xl !font-extrabold tracking-tight">
            <span className="whitespace-nowrap bg-gradient-to-r from-[#ff80b5] to-[#9089fc] bg-clip-text text-transparent transition duration-500 ease-in-out">
              Rapid
            </span>{' '}
            internal tool development platform
          </Title>
          <Paragraph className="text-base font-normal leading-7 tracking-wide text-mutedForeground">
            Create custom internal tools quickly and easily, with less code and fewer resources.
            Boost productivity, cut costs, and deploy your tools faster, all while ensuring
            enterprise-grade security.
          </Paragraph>
          <Button className="my-2" size="large" type="primary" onClick={navigateToAppPage}>
            Get Started
          </Button>
        </Flex>
        <img
          src={hero}
          className="w-full max-w-5xl rounded-xl border-[1px] border-solid border-border object-contain"
        />
      </Flex>
    </Content>
  );
};

export default LandingPageHero;
