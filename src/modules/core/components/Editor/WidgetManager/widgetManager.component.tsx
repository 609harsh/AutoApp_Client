import { ChangeEvent, useState } from 'react';
import { Flex, Typography } from 'antd';
import Fuse from 'fuse.js';
import { isEmpty } from 'lodash';

import { Box } from '../../../interfaces/container.interface';
import { capitalizeEveryWord } from '../../../utils/editorUtils';
import { DraggableBox } from '../../DraggableBox/dragglebox.component';
import { SearchBox } from '../SearchBox/SearchBox.component';
import { componentTypes } from './widgetsComponents';

const { Title } = Typography;

export const WidgetManager: React.FC = () => {
  const [filteredComponents, setFilteredComponents] = useState(componentTypes);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
    filterComponents(value);
  }

  const filterComponents = (value: string) => {
    if (value !== '') {
      const fuse = new Fuse(componentTypes, { keys: ['component'] });
      const results = fuse.search(value);
      setFilteredComponents(results.map((result) => result.item));
    } else {
      setFilteredComponents(componentTypes);
    }
  }

  function renderList(header: string | undefined , items: Box[]) {
    if (isEmpty(items)) return null;
    return (
      <Flex vertical gap="middle" className="">
        <h1 className="text-xs font-semibold text-slate-600">{capitalizeEveryWord(header)}</h1>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {items.map((component, i) => (
            <DraggableBox key={i} box={component} />
          ))}
        </div>
      </Flex>
    );
  }

  const segregateSections = () => {
    if (filteredComponents.length === 0) {
      return (
        <Flex vertical gap="middle">
          <p>No results found</p>
          <p>Try adjusting your search or filter to find what you're looking for.</p>
          <button
            onClick={() => {
              setFilteredComponents(componentTypes);
              setSearchQuery('');
            }}
          >
            clear query
          </button>
        </Flex>
      );
    }

    const commonSection = { title: 'commonly used', items: new Array() };
    const layoutsSection = { title: 'layouts', items: new Array() };
    const formSection = { title: 'forms', items: new Array() };
    const integrationSection = { title: 'integrations', items: new Array() };
    const otherSection = { title: 'others', items: new Array() };
    const allWidgets: Box[] = [];

    const commonItems = ['Table', 'Chart', 'Button', 'Text', 'Datepicker'];
    const formItems = [
      'Form',
      'TextInput',
      'NumberInput',
      'PasswordInput',
      'Textarea',
      'ToggleSwitch',
      'Dropdown',
      'Multiselect',
      'RichTextEditor',
      'Checkbox',
      'Radio-button',
      'Datepicker',
      'DateRangePicker',
      'FilePicker',
      'StarRating'
    ];
    const integrationItems = ['Map'];
    const layoutItems = ['Container', 'Listview', 'Tabs', 'Modal'];

    filteredComponents.forEach((f) => {
      if (searchQuery) allWidgets.push(f);
      if (commonItems.includes(f.name)) commonSection.items.push(f);
      if (formItems.includes(f.name)) formSection.items.push(f);
      else if (integrationItems.includes(f.name)) integrationSection.items.push(f);
      else if (layoutItems.includes(f.name)) layoutsSection.items.push(f);
      else otherSection.items.push(f);
    });

    if (allWidgets.length > 0) {
      return (
        <Flex vertical gap="large">
          {renderList(undefined, allWidgets)}
        </Flex>
      );
    } else {
      return (
        <Flex vertical gap="large">
          {renderList(commonSection.title, commonSection.items)}
          {renderList(layoutsSection.title, layoutsSection.items)}
          {renderList(formSection.title, formSection.items)}
          {renderList(otherSection.title, otherSection.items)}
          {renderList(integrationSection.title, integrationSection.items)}
        </Flex>
      );
    }
  }

  return (
    <Flex vertical gap="small" className="w-full p-4">
      <Title className="!text-sm font-bold tracking-tight">Components</Title>
      <SearchBox
        callBack={handleSearchQueryChange}
        onClearCallback={() => {
          setSearchQuery('');
          filterComponents('');
        }}
      />
      <Flex className="p-2">{segregateSections()}</Flex>
    </Flex>
  );
};
