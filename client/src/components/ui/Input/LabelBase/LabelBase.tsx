import * as Form from '@radix-ui/react-form';
import React, { LabelHTMLAttributes, memo } from 'react';
import { styled } from 'styled-components';

export type LabelBaseProps = {
  readonly label?: string;
  readonly labelRef?: React.RefObject<HTMLLabelElement>;
  readonly children?: React.ReactNode;
} & LabelHTMLAttributes<HTMLLabelElement>;

const LabelBase = ({
  label,
  labelRef,
  children,
  ...rest
}: LabelBaseProps): JSX.Element => (
  <StyledRow>
    <StyledLabel ref={labelRef} {...rest}>
      {label}
    </StyledLabel>
    {children}
  </StyledRow>
);

LabelBase.displayName = 'LabelBase';

export default memo(LabelBase);

const StyledRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
`;
const StyledLabel = styled(Form.Label)`
  color: var(---input-label-color, '#ffffff');
  font-size: 15px;
  font-weight: 500;
  line-height: 35px;
`;
