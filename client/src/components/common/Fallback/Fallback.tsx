import { memo } from 'react';
import { styled } from 'styled-components';
import { PageTitle } from '../PageTitle/PageTitle';

export const Fallback = (): JSX.Element => {
  return (
    <StyledElement aria-busy="true" data-testid="footer" role="alert">
      <PageTitle title="Loading" />
      <StyledLine />
      <StyledLine />
      <StyledLine />
      <StyledLine />
      <StyledLine />
    </StyledElement>
  );
};

export default memo(Fallback);

const StyledElement = styled.div``;

const StyledLine = styled.div`
  background: var(--palette-grey-10);
  height: 20px;
  width: 100%;
  margin-bottom: 5px;
`;
