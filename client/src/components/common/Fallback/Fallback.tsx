import { memo } from 'react';
import { styled } from 'styled-components';
import { PageTitle } from '../PageTitle/PageTitle';

export const Fallback = (): JSX.Element => {
  return (
    <div aria-busy="true" data-testid="footer" role="alert">
      <PageTitle title="Loading" />
      {[...Array(5)].map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <StyledLine key={index} />
      ))}
    </div>
  );
};

export default memo(Fallback);

const StyledLine = styled.div`
  background: var(--palette-grey-10);
  height: 20px;
  width: 100%;
  margin-bottom: 5px;
`;
