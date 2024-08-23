import * as Form from '@radix-ui/react-form';
import React, { LabelHTMLAttributes, memo } from 'react';
import { styled } from 'styled-components';

export type LabelBaseProps = {
  readonly label?: string;
  readonly ref?: React.RefObject<HTMLLabelElement>;
} & LabelHTMLAttributes<HTMLLabelElement>;

const LabelBase = ({ ref, label, ...rest }: LabelBaseProps): JSX.Element => (
  <StyledLabel ref={ref} {...rest}>
    {label}
  </StyledLabel>
);

LabelBase.displayName = 'LabelBase';

export default memo(LabelBase);

const StyledLabel = styled(Form.Label)`
  color: var(---input-label-color, '#ffffff');
  font-size: 15px;
  font-weight: 500;
  line-height: 35px;
`;
