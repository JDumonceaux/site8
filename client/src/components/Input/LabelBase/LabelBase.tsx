import * as Label from '@radix-ui/react-label';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import React, { LabelHTMLAttributes, memo, JSX } from 'react';
import { styled } from 'styled-components';
import Tooltip from '../Tooltip/Tooltip';
import { TooltipBaseProps } from '../Tooltip/TooltipBase';

type LabelBaseProps = {
  readonly label?: string;
  readonly ref?: React.RefObject<HTMLLabelElement>;
  readonly required?: boolean;
  readonly children?: React.ReactNode;
  readonly tooltipProps?: TooltipBaseProps;
  readonly description?: string;
  readonly endAdornment?: React.ReactNode;
} & LabelHTMLAttributes<HTMLLabelElement>;

/* Note: If you use htmlfor(or for) attribute, 
  clicking on the label doesn't seem to select the input */

const LabelBase = ({
  label,
  required = false,
  ref,
  children,
  tooltipProps,
  description,
  endAdornment,
  ...rest
}: LabelBaseProps): JSX.Element => (
  <Label.Root ref={ref} {...rest}>
    <StyledRow>
      <StyledLabel>
        {label}
        {required && <VisuallyHidden.Root>required</VisuallyHidden.Root>}
        {required && (
          <Tooltip.Asterix
            content="Required"
            triggerColor="var(--color-required)"
            {...tooltipProps}
          />
        )}
      </StyledLabel>
      {description && <Tooltip.QuestionMark content={description} />}
      {endAdornment}
    </StyledRow>
    {children}
  </Label.Root>
);

LabelBase.displayName = 'LabelBase';

export default memo(LabelBase);

const StyledLabel = styled.div`
  color: var(--input-label-color, '#ffffff');
  font-size: 15px;
  font-weight: 500;
`;
const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: space-between;
  padding: 4px 0px;
  > div:first-child {
    flex-grow: 1;
  }
`;
