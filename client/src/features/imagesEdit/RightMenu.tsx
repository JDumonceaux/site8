import React, { memo, useMemo, useCallback } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Input from 'components/Input/Input';
import useImageFolder from 'features/imagesEdit/useImageFolder';
import { styled } from 'styled-components';
import type { ListItem } from 'types/ListItem';

type Props = {
  readonly currentFilter: string;
  readonly currentFolder: string;
  readonly onClick: (val: string | undefined) => void;
  readonly onFilterSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const RightMenu = memo(
  ({
    currentFilter,
    currentFolder,
    onClick,
    onFilterSelect,
  }: Props): React.JSX.Element => {
    const { data, error, isLoading } = useImageFolder();

    const filterData = useMemo(
      () =>
        data?.map((x) => ({
          key: x.id,
          value: x.value,
        })),
      [data],
    );

    const handleButton = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        const { dataset } = event.currentTarget;
        const { id } = dataset;
        if (id) {
          const tempId = Number(id);
          const item = data?.find((x) => x.id === tempId);
          onClick(item?.value);
        }
      },
      [data, onClick],
    );

    const FolderButton = memo(
      ({
        handleClick,
        isActive,
        item,
      }: {
        handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
        isActive: boolean;
        item: ListItem;
      }): React.JSX.Element =>
        isActive ? (
          <StyledActiveButton
            data-id={item.id}
            onClick={handleClick}
            type="button">
            {item.value}
          </StyledActiveButton>
        ) : (
          <StyledButton data-id={item.id} onClick={handleClick} type="button">
            {item.value}
          </StyledButton>
        ),
    );

    const renderedButtons = useMemo(
      () =>
        data?.map((item) => (
          <FolderButton
            handleClick={handleButton}
            isActive={item.value === currentFolder}
            item={item}
            key={item.id}
          />
        )),
      [data, currentFolder, handleButton],
    );

    return (
      <StickyMenu>
        <FilterDiv>
          <Input.Select
            dataList={filterData}
            label="Filter"
            onChange={onFilterSelect}
            value={currentFilter}
          />
        </FilterDiv>
        <StyledHeader>
          <div>
            {currentFolder && currentFolder.length > 0 ? (
              <StyledButton
                data-id={currentFolder}
                onClick={handleButton}
                type="button">
                {currentFolder}
              </StyledButton>
            ) : (
              <div>Select Folder ({data?.length})</div>
            )}
          </div>
        </StyledHeader>
        <hr />
        <LoadingWrapper error={error} isLoading={isLoading}>
          {renderedButtons}
        </LoadingWrapper>
      </StickyMenu>
    );
  },
);

RightMenu.displayName = 'RightMenu';

export default RightMenu;

const StyledButton = styled.button`
  display: block;
  width: 100%;
  padding: 5px 0;
  text-align: left;
  cursor: pointer;
  &:hover {
    background-color: #dcdcdc;
  }
`;
const StyledActiveButton = styled.button`
  display: block;
  width: 100%;
  padding: 5px 0;
  color: var(--navbar-dark-primary);
  background-color: var(--palette-samp);
  text-align: left;
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
    border: 1px solid #ccc;
  }
`;
