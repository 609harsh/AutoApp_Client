import { useState } from 'react';
import { Button, Dropdown, Flex, Input, Typography } from 'antd';
import Fuse from 'fuse.js';
import { IoMdAdd } from 'react-icons/io';
import { MdDelete, MdDriveFileRenameOutline, MdOutlineChangeCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { AppType } from '../../interfaces/dashboard.interface';

type AppControlPanelProps = {
  apps: AppType[];
  openModalWithMethod: ({
    method,
    appId
  }: {
    method: 'createApp' | 'renameApp' | 'changeIcon' | 'deleteApp';
    appId?: string | null;
  }) => void;
};

const { Paragraph } = Typography;

const AppControlPanel: React.FC<AppControlPanelProps> = ({ apps, openModalWithMethod }) => {
  const [filteredApps, setFilteredApps] = useState<AppType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setSearchQuery(value);
    filterComponents(value);
  }

  function filterComponents(value: string) {
    if (value !== '') {
      const fuse = new Fuse(apps, { keys: ['name'] });
      const results = fuse.search<AppType>(value);
      setFilteredApps(results.map((result) => result.item));
    } else {
      setFilteredApps([]);
    }
  }

  let items =
    filteredApps.length > 0
      ? filteredApps.map((item) => {
          return {
            key: item.id,
            label: (
              <Flex align="center" justify="space-between" className="cursor-default py-1">
                <Flex className="cursor-pointer" onClick={() => navigate(`/app/editor/${item.id}`)}>
                  <Paragraph className="text-md !m-0 font-semibold text-foreground/80">
                    {item?.name}
                  </Paragraph>
                </Flex>
                <Flex align="center" className="gap-3">
                  <Flex
                    className="cursor-pointer p-0 text-xl font-semibold text-mutedForeground hover:text-foreground"
                    onClick={() => {
                      setSearchQuery('');
                      openModalWithMethod({
                        method: 'renameApp',
                        appId: item.id
                      });
                    }}
                  >
                    <MdDriveFileRenameOutline />
                  </Flex>
                  <Flex
                    className="cursor-pointer p-0 text-xl font-semibold text-mutedForeground hover:text-foreground"
                    onClick={() => {
                      setSearchQuery('');
                      openModalWithMethod({
                        method: 'changeIcon',
                        appId: item.id
                      });
                    }}
                  >
                    <MdOutlineChangeCircle />
                  </Flex>
                  <Flex
                    className="cursor-pointer p-0 text-xl font-semibold text-[#ff7875] hover:text-[#f5222d]"
                    onClick={() => {
                      setSearchQuery('');
                      openModalWithMethod({
                        method: 'deleteApp',
                        appId: item.id
                      });
                    }}
                  >
                    <MdDelete />
                  </Flex>
                </Flex>
              </Flex>
            )
          };
        })
      : [
          {
            key: '1',
            label: (
              <Paragraph className="text-md text-md !m-0 font-semibold text-mutedForeground">
                No apps match your search!
              </Paragraph>
            ),
            disabled: true
          }
        ];

  return (
    <Flex align="center" justify="center" className="gap-5 p-4 py-8">
      <Button
        type="primary"
        className="flex items-center gap-1"
        size="large"
        onClick={() =>
          openModalWithMethod({
            method: 'createApp'
          })
        }
      >
        <IoMdAdd className="mb-[1px] text-xl" />
        Create App
      </Button>
      <Dropdown menu={{ items }} open={searchQuery !== ''}>
        <Input.Search
          placeholder="Search Apps"
          allowClear
          className="w-full max-w-md"
          value={searchQuery}
          size="large"
          onChange={handleSearchQueryChange}
        />
      </Dropdown>
    </Flex>
  );
};

export default AppControlPanel;
