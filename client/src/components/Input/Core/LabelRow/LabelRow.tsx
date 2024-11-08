import * as Label from '@radix-ui/react-label';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import React, { LabelHTMLAttributes, memo, JSX } from 'react';
import { styled } from 'styled-components';
import Tooltip from '../Tooltip/Tooltip';
import { TooltipBaseProps } from '../Tooltip/TooltipBase';

type LabelRowProps = {
  readonly children?: React.ReactNode;
  readonly description?: string;
  readonly endAdornment?: React.ReactNode;
  readonly label?: string;
  readonly ref?: React.RefObject<HTMLLabelElement>;
  readonly required?: boolean;
  readonly requiredText?: string;
  readonly tooltipProps?: TooltipBaseProps;
} & Omit<LabelHTMLAttributes<HTMLLabelElement>, 'onChange' | 'onClick'>;

/* Note: If you use htmlfor(or for) attribute, 
  clicking on the label doesn't seem to select the input */

const LabelRow = ({
  children,
  id,
  description,
  endAdornment,
  label,
  ref,
  required = false,
  requiredText,
  tooltipProps,
  ...rest
}: LabelRowProps): JSX.Element => (
  <Label.Root htmlFor={id} ref={ref} {...rest}>
    <StyledRow>
      <StyledLabel>
        {label}
        {required && <VisuallyHidden.Root>{requiredText}</VisuallyHidden.Root>}
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

LabelRow.displayName = 'LabelRow';

export default memo(LabelRow);

export type { LabelRowProps };

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
