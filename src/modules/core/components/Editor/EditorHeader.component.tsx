import { Flex, Layout, Skeleton, Typography, Button, Select } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import { IoMdCloudDone } from "react-icons/io";
import { BsStack } from "react-icons/bs";
import { FaRegWindowMaximize } from "react-icons/fa";
import { useGetAppQuery } from '../../../shared/apis/appApi';
import { useSaveComponentsMutation } from '../../../shared/apis/componentApi';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../shared/hooks/useAppSelector';

const { Header } = Layout;
const { Text } = Typography;

const EditorHeader: React.FC<{ setIsOpen: (state: boolean) => void }> = ({ setIsOpen }) => {
  const { id } = useParams();
  const [saveStatus, setSaveStatus] = useState("Save");
  const boxes = useAppSelector(state => state.editor.boxes);
  let boxesArray = Object.keys(boxes).map(key => boxes[key]);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const version = queryParams.get("version");
  const env = queryParams.get("env");

  const { data: app, isLoading } = useGetAppQuery(id || '');
  const [saveComponents] = useSaveComponentsMutation();

  const handleChange = (value: string) => {
    if(value==="create") {
      console.log(" modal opened");
      setIsOpen(true);
    }
  };

  
  const saveApp = async () => {
    setSaveStatus("Saving");
    try {
      await saveComponents({ appId: id, data: boxesArray }).unwrap();
    } catch(err) { 
      console.log(err); 
    }
    setSaveStatus("Saved");
  }

  useEffect(() => {
    setSaveStatus("Save");
  }, [boxes])

  return (
    <Header className="flex max-h-12 items-center border-0 border-b-[1px] border-solid border-border !bg-background p-0 px-4">
      <Flex align="center" justify="space-between" className="h-full w-full p-4">
        {isLoading ? (
          <Skeleton.Input size="small" active className="!m-0 !leading-none" />
        ) : (
          <Text className="!m-0 !p-0 !text-base font-semibold text-foreground/80">{app?.name}</Text>
        )}
        <Flex justify="center" align='center' className="font-medium text-mutedForeground gap-6">
          <Button 
              onClick={() => saveApp()} 
              disabled={saveStatus=="Saved"} 
              className='flex justify-center items-center w-32 text-xs'
              loading={saveStatus==="Saving"}>
            {saveStatus==="Saved" && <IoMdCloudDone className='mr-1'/>}{saveStatus}
            </Button>
          <Flex justify='center' align='center'>
          <Typography className='mr-1 text-[#8e4ec6] flex justify-center items-center'><FaRegWindowMaximize className=''/>env</Typography>
          <Select
            defaultValue={env}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'dev', label: 'development' },
              { value: 'stage', label: 'staging' },
              { value: 'prod', label: 'production' }
            ]}
            />
            </Flex>
          <Flex justify='center' align='center'>
          <Typography className='mr-1 text-[#d6409f] flex justify-center items-center'><BsStack/>ver</Typography>
          <Select
            defaultValue={version}
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'jack', label: 'v1' },
              { value: 'lucy', label: 'v2' },
              { value: 'Yiminghe', label: 'v3' },
              { value: 'create', label: <Flex>Create new version</Flex>},
            ]}
            />
            </Flex>
        </Flex>
      </Flex>
    </Header>
  );
};

export default EditorHeader;
