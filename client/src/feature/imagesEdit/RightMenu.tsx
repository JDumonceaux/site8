import React, { useEffect } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Input from 'components/Input/Input';
import useImageFolder from 'feature/imagesEdit/useImageFolder';
import { styled } from 'styled-components';
import type { ListItem } from 'types/ListItem';

type Props = {
  readonly currentFilter: string;
  readonly currentFolder: string;
  readonly onClick: (val: string) => void;
  readonly onFilterSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const RightMenu = ({
  currentFilter,
  currentFolder,
  onClick,
  onFilterSelect,
}: Props): React.JSX.Element => {
  const { data, error, isLoading } = useImageFolder();

  const filterData: ListItem[] | undefined = data?.map((x) => ({
    key: x.id,
    value: x.value,
  }));

  const handleOnClick = onClick;

  return (
    <StickyMenu>
      <FilterDiv>
        <Input.Select
          data={filterData}
          label="Filter"
          onChange={onFilterSelect}
          value={currentFilter}
        />
      </FilterDiv>
      <StyledHeader>
        <div>
          {currentFolder && currentFolder.length > 0 ? (
            <StyledButton
              onClick={() => {
                handleOnClick('');
              }}
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
        {data?.map((item) => (
          <React.Fragment key={item.id}>
            {item.value === currentFolder ? (
              <StyledActiveButton
                onClick={() => {
                  handleOnClick(item.value);
                }}
                type="button">
                {item.value}
              </StyledActiveButton>
            ) : (
              <StyledButton
                onClick={() => {
                  handleOnClick(item.value);
                }}
                type="button">
                {item.value}
              </StyledButton>
            )}
          </React.Fragment>
        ))}
      </LoadingWrapper>
    </StickyMenu>
  );
};

export default RightMenu;

const StyledButton = styled.button`
  display: block;
  width: 100%;
  padding: 5px 0;
  text-align: left;
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
