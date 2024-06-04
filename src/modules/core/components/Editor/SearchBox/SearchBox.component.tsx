import { ChangeEvent, useEffect, useState } from 'react';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Flex, Input } from 'antd';

import useDebounce from '../../../../shared/hooks/useDebounce';
import useMounted from '../../../../shared/hooks/useMount';
import { Props } from './SearchBoxProps.type';

export const SearchBox: React.FC<Props> = ({
  onSubmit,
  debounceDelay = 300,
  callBack,
  onClearCallback
}) => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchTerm = useDebounce(searchText, debounceDelay);
  const [isFocused, setFocussed] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    callBack?.(e);
  };

  const clearSearchText = () => {
    setSearchText('');
    onClearCallback?.();
  };

  const mounted = useMounted();

  useEffect(() => {
    if (mounted) {
      onSubmit?.(debouncedSearchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, onSubmit]);

  return (
    <Flex className="items-center" gap="small">
      {!isFocused && <SearchOutlined className="text-foreground" />}
      <Input
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder="Search widgets"
        onFocus={() => setFocussed(true)}
        onBlur={() => setFocussed(false)}
      />
      {searchText.length > 0 && (
        <Flex
          className="cursor-pointer items-center justify-center rounded-lg p-2 text-foreground transition duration-200 ease-in-out hover:bg-blue-50"
          onClick={clearSearchText}
        >
          <CloseOutlined />
        </Flex>
      )}
    </Flex>
  );
};
