import { type FC, memo } from 'react';

import styled from 'styled-components';
import type { FieldError } from 'types';

export type FooterRowProps = {
  readonly errors?: FieldError[];
  readonly fieldLength?: number;
  readonly maxLength?: number;
  readonly showCounter?: boolean;
};

const FooterRow: FC<FooterRowProps> = memo(
  ({
    errors,
    fieldLength = 0,
    maxLength = 0,
    showCounter = false,
  }: FooterRowProps): React.JSX.Element => {
    const text = errors ? errors[0].message : null;
    return (
      <RowDiv>
        <div>{text}</div>
        {showCounter ? (
          <CounterDiv>
            {fieldLength}/{maxLength}
          </CounterDiv>
        ) : null}
      </RowDiv>
    );
  },
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
const CounterDiv = styled.div`
  color: var(--input-helper-font-color);
`;
