import { memo } from 'react';

import PageTitle from 'components/core/PageTitle/PageTitle';
import styled from 'styled-components';

const Fallback = memo((): React.JSX.Element => {
  return (
    <output aria-busy="true" data-testid="footer">
      <PageTitle title="Loading" />
      {Array.from({ length: 5 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <LoadingLine key={index} />
      ))}
    </output>
  );
});

Fallback.displayName = 'Fallback';

export default Fallback;

const LoadingLine = styled.div`
  background: var(--palette-grey-10);
  height: 20px;
  width: 100%;
  margin-bottom: 5px;
`;
