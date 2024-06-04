import { Layout } from 'antd';

import LandingPageHeader from '../../components/LandingPage/LandingPageHeader.component';
import LandingPageHero from '../../components/LandingPage/LandingPageHero.component';

const LandingPage: React.FC = () => {
  return (
    <Layout className="h-screen overflow-hidden">
      <LandingPageHeader />
      <LandingPageHero />
    </Layout>
  );
};

export default LandingPage;
