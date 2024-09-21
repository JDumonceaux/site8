import * as Label from '@radix-ui/react-label';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import React, { LabelHTMLAttributes, memo } from 'react';
import { styled } from 'styled-components';
import Tooltip from '../Tooltip/Tooltip';

type LabelBaseProps = {
  readonly label?: string;
  readonly ref?: React.RefObject<HTMLLabelElement>;
  readonly required?: boolean;
} & LabelHTMLAttributes<HTMLLabelElement>;

const LabelBase = ({
  label,
  required = false,
  ref,
  ...rest
}: LabelBaseProps): JSX.Element => (
  <StyledLabel ref={ref} {...rest}>
    {label} {required && <VisuallyHidden.Root>required</VisuallyHidden.Root>}
    {required && (
      <StyledRequired aria-hidden="true">
        <Tooltip content="Required" trigger="*"></Tooltip>
      </StyledRequired>
    )}
  </StyledLabel>
);

LabelBase.displayName = 'LabelBase';

export default memo(LabelBase);

const StyledLabel = styled(Label.Root)`
  color: var(--input-label-color, '#ffffff');
  font-size: 15px;
  font-weight: 500;
`;
const StyledRequired = styled.span`
  color: var(--color-required);
`;
