import React, { memo } from 'react';
import { styled } from 'styled-components';
import LabelBase, { LabelBaseProps } from '../LabelBase/LabelBase';

export type LabelRowProps = {
  readonly children?: React.ReactNode;
} & LabelBaseProps;

const LabelRow = ({
  label,
  ref,
  children,
  ...rest
}: LabelRowProps): JSX.Element => (
  <StyledRow>
    <LabelBase ref={ref} {...rest}>
      {label}
    </LabelBase>
    {children}
  </StyledRow>
);

LabelRow.displayName = 'LabelRow';

export default memo(LabelRow);

const StyledRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
`;
