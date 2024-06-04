import { Button, Flex, Layout, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../../../assets/logo.png';
import { useAuth } from '../../../shared/hooks/useAuth';

const { Header } = Layout;
const { Paragraph } = Typography;

const LandingPageHeader: React.FC = () => {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();

  function navigateToLoginPage() {
    navigate('/auth/login');
  }

  function navigateToSignupPage() {
    navigate('/auth/signup');
  }

  function navigateToAppPage() {
    navigate('/app');
  }

  return (
    <Header className="flex w-full items-center justify-center border-0 border-b-[1px] border-solid border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Flex className="container w-full" justify="space-between" align="center">
        <Link to="/">
          <Flex justify="center" align="center" className="group gap-2">
            <img src={logo} className="h-8 w-8 rounded-lg" alt="logo" />
            <Paragraph className="!m-0 hidden text-lg font-extrabold tracking-tight text-mutedForeground transition duration-300 ease-in-out group-hover:text-foreground sm:block">
              AutoApp
            </Paragraph>
          </Flex>
        </Link>
        <Flex className="items-center gap-4">
          {loggedIn ? (
            <>
              <Button type="primary" onClick={navigateToAppPage}>
                Go to App
              </Button>
            </>
          ) : (
            <>
              <Button type="dashed" onClick={navigateToSignupPage}>
                Signup
              </Button>
              <Button type="primary" onClick={navigateToLoginPage}>
                Login
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Header>
  );
};

export default LandingPageHeader;
