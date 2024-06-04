import { Flex, Layout, Menu, MenuProps } from 'antd';
import { TbLayoutDashboard } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

type LeftPanelProps = {
  showMenu?: boolean;
};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    'Dashboard',
    '1',
    <Link to="/app" className="flex items-center justify-center">
      <TbLayoutDashboard className=" text-foreground/80" />
    </Link>
  )
];

const LeftPanel: React.FC<LeftPanelProps> = ({ showMenu = false }) => {
  return (
    <Sider
      collapsed
      collapsedWidth={48}
      className="border-0 border-r-[1px] border-solid border-border !bg-background"
    >
      <Flex vertical className="h-full gap-2">
        <Flex className="h-12 items-center justify-center border-0 border-b-[1px] border-solid border-border">
          <Link to="/app" className="flex h-full w-full items-center justify-center">
            <img
              className="h-7 w-7 rounded-lg object-contain transition ease-in-out hover:scale-105"
              src="/favicon.ico"
              alt="Logo"
            />
          </Link>
        </Flex>
        {showMenu && <Menu mode="inline" items={items} />}
      </Flex>
    </Sider>
  );
};

export default LeftPanel;
