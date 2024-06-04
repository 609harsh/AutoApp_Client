import { useEditor } from '../../../../shared/hooks/useEditor';
import ButtonSettings from './ButtonSettings.component';

const AllComponentsSettings = {
  Button: ButtonSettings
};

const Settings: React.FC = () => {
  const { boxes, selectedComponentId } = useEditor();

  if (!selectedComponentId) return;

  const box = boxes[selectedComponentId];
  console.log(box);
  const ComponentSettings = AllComponentsSettings[box.component];
  return (
    <>
      <ComponentSettings></ComponentSettings>
    </>
  );
};

export default Settings;
