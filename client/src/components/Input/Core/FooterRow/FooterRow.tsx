import { memo, JSX } from 'react';
import { styled } from 'styled-components';

type FooterRowProps = {};

const FooterRow = ({ ...rest }: FooterRowProps): JSX.Element => (
  <RowDiv></RowDiv>
);

FooterRow.displayName = 'FooterRow';

export default memo(FooterRow);

export type { FooterRowProps };

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
