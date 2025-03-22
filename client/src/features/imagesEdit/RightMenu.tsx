import React, { memo, useMemo, useCallback } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Input from 'components/Input/Input';
import useImageFolder from 'features/imagesEdit/useImageFolder';
import { styled } from 'styled-components';

import FolderButton from './FolderButton';

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
    const { data, isError, isPending } = useImageFolder();

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

    const renderedButtons = useMemo(
      () =>
        filterData?.map((item) => (
          <FolderButton
            handleClick={handleButton}
            isActive={item.value === currentFolder}
            item={item}
            key={item.key}
          />
        )),
      [filterData, handleButton, currentFolder],
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
        <LoadingWrapper isError={isError} isPending={isPending}>
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
