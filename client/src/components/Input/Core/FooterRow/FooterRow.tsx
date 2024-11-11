import { memo } from 'react';

import { styled } from 'styled-components';

const FooterRow = (): React.JSX.Element => <RowDiv />;

FooterRow.displayName = 'FooterRow';

export default memo(FooterRow);

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  font-size: 0.75rem;
  justify-content: space-between;
  padding: 4px 0px;
  > div:first-child {
    flex-grow: 1;
  }
`;
