import { useState } from 'react';
import { Layout, Modal } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import EditorCanvas from '../../components/Editor/EditorCanvas/EditorCanvas.component';
import EditorHeader from '../../components/Editor/EditorHeader.component';
import LeftPanel from '../../components/Editor/LeftPanel.component';
import RightPanel from '../../components/Editor/RightPanel.component';

const EditorPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  }
  return (
    <Layout className="min-h-screen">
      <Modal open={isOpen} onCancel={closeModal}></Modal>
      <DndProvider backend={HTML5Backend}>
        <LeftPanel showMenu />
        <Layout>
          <EditorHeader setIsOpen={setIsOpen}/>
          <EditorCanvas />
        </Layout>
        <RightPanel />
      </DndProvider>
    </Layout>
  );
};

export default EditorPage;
