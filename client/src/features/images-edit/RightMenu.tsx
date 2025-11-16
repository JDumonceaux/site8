import type { JSX } from 'react';

import LoadingWrapper from '@components/core/loading/LoadingWrapper';
import Input from '@components/input/Input';
import styled from 'styled-components';
import useImageFolder from '@features/images-edit/useImageFolder';
import FolderButton from './FolderButton';

type Props = {
  readonly currentFilter: string;
  readonly currentFolder: string;
  readonly onClick: (val: string | undefined) => void;
  readonly onFilterSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const RightMenu = ({
  currentFilter,
  currentFolder,
  onClick,
  onFilterSelect,
}: Props): JSX.Element => {
  const { data, isError, isPending } = useImageFolder();

  const filterData = data?.map((x) => ({
    key: x.id,
    value: x.value,
  }));

  const handleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget.dataset;
    if (id) {
      const tempId = Number(id);
      const item = data?.find((x) => x.id === tempId);
      onClick(item?.value);
    }
  };

  const renderedButtons = filterData?.map((item) => (
    <FolderButton
      key={item.key}
      handleClick={handleButton}
      isActive={item.value === currentFolder}
      item={item}
    />
  ));

  let renderStyledButton: React.ReactNode;
  renderStyledButton = currentFolder ? (
    <StyledButton
      data-id={currentFolder}
      type="button"
      onClick={handleButton}
    >
      {currentFolder}
    </StyledButton>
  ) : (
    <div>Select Folder ({data?.length})</div>
  );

  return (
    <StickyMenu>
      <FilterDiv>
        <Input.Select
          dataList={filterData}
          label="Filter"
          value={currentFilter}
          onChange={onFilterSelect}
        />
      </FilterDiv>
      <StyledHeader>
        <div>{renderStyledButton}</div>
      </StyledHeader>
      <hr />
      <LoadingWrapper
        isPending={isPending}
        isError={isError}
      >
        {renderedButtons}
      </LoadingWrapper>
    </StickyMenu>
  );
};

RightMenu.displayName = 'RightMenu';
export default RightMenu;

const StyledButton = styled.button`
  display: block;
  width: 100%;
  padding: 5px 0;
  text-align: left;
  cursor: pointer;
  background: var(--input-background-color, #fff);
  color: var(--text-primary-color, #1f1f1f);
  border: 1px solid var(--input-border-color, #bebebe);
  border-radius: var(--input-border-radius, 4px);
  transition: background 0.2s;
  &:hover {
    background-color: var(--input-background-focus-color, #e1e1e1);
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  align-items: baseline;
`;

const StickyMenu = styled.div`
  position: sticky;
  top: 100px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  padding-bottom: 20px;
`;

const FilterDiv = styled.div`
  margin-bottom: 18px;
  select {
    border: 1px solid var(--input-border-color, #bebebe);
    background: var(--input-background-color, #fff);
    color: var(--input-color, #212121);
    border-radius: var(--input-border-radius, 4px);
    padding: 4px 8px;
    transition: border-color 0.2s;
    &:focus {
      border-color: var(--input-border-focus-color, #5d5d5d);
      outline: none;
    }
  }
`;
