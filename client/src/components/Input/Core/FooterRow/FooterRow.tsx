import { type FC, memo } from 'react';

import styled from 'styled-components';

export type FooterRowProps = {
  readonly ref?: React.Ref<HTMLDivElement>;
  readonly text?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const FooterRow: FC<FooterRowProps> = memo(
  ({ ref, text, ...rest }: FooterRowProps): React.JSX.Element => (
    <RowDiv {...rest} ref={ref}>
      {text}
    </RowDiv>
  ),
);

FooterRow.displayName = 'FooterRow';

export default FooterRow;

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
