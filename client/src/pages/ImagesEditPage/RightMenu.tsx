import React from 'react';
import { styled } from 'styled-components';

type Props = {
  readonly data: { id: number; name: string }[];
  readonly currentFolder?: string;
  readonly handleOnClick: (val: string) => void;
};

const RightMenu = ({
  data,
  currentFolder,
  handleOnClick,
}: Props): React.JSX.Element => {
  return (
    <>
      <StickyMenu>
        <StyledHeader>
          <div>
            {currentFolder && currentFolder.length > 0 ? (
              <StyledButton onClick={() => handleOnClick('')} type="button">
                {currentFolder}
              </StyledButton>
            ) : (
              <div>Select Folder</div>
            )}
          </div>
          <div>{data?.length}</div>
        </StyledHeader>
        <hr />
        {data?.map((item) => (
          <React.Fragment key={item.id}>
            {item.name === currentFolder ? (
              <StyledActiveButton
                onClick={() => handleOnClick(item.name)}
                type="button">
                {item.name}
              </StyledActiveButton>
            ) : (
              <StyledButton
                onClick={() => handleOnClick(item.name)}
                type="button">
                {item.name}
              </StyledButton>
            )}
          </React.Fragment>
        ))}
      </StickyMenu>
    </>
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
  top: 80px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  padding-bottom: 20px;
`;
