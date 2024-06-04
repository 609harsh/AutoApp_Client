import { Flex, Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';

type AuthPageLayoutProps = {
  children: JSX.Element;
};

const { Content, Header } = Layout;
const { Paragraph } = Typography;

function AuthPageLayout({ children }: AuthPageLayoutProps): JSX.Element {
  return (
    <Layout className="relative min-h-screen">
      <Header className="sticky top-0 z-10 flex w-full items-center justify-center border-0 border-b-[1px] border-solid border-border bg-background/95 bg-white backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link to="/" className="group flex items-center gap-[6px]">
          <img
            className="h-8 w-8 rounded-md object-contain"
            src="/favicon.ico"
            alt="Tooljet Logo"
          />
          <Paragraph className="!m-0 hidden text-base font-extrabold tracking-tight text-mutedForeground transition duration-300 ease-in-out group-hover:text-foreground sm:block">
            AutoApp
          </Paragraph>
        </Link>
      </Header>
      <Content className="bg-background/10 p-4">
        <Flex className="items-center justify-center">{children}</Flex>
      </Content>
    </Layout>
  );
}

export default AuthPageLayout;
