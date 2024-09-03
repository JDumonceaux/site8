import * as Form from '@radix-ui/react-form';
import React, { LabelHTMLAttributes, memo } from 'react';
import { styled } from 'styled-components';

type RequiredLabelProps = {
  readonly show?: boolean;
  readonly label?: string;
  readonly ref?: React.RefObject<HTMLLabelElement>;
} & LabelHTMLAttributes<HTMLLabelElement>;

const RequiredLabelBase = ({
  label,
  show,
  ref,
  ...rest
}: RequiredLabelProps): JSX.Element => {
  if (!show) {
    return <></>;
  }
  return (
    <StyledLabel ref={ref} {...rest}>
      {label}
    </StyledLabel>
  );
};

RequiredLabelBase.displayName = 'RequiredLabelBase';

export default memo(RequiredLabelBase);

const StyledLabel = styled(Form.Label)`
  color: var(---input-label-color, '#ffffff');
  font-size: 15px;
  font-weight: 500;
  line-height: 35px;
`;
