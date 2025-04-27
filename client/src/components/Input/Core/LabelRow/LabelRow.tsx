import { memo, type LabelHTMLAttributes } from 'react';

import * as Label from '@radix-ui/react-label';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import styled from 'styled-components';

import Tooltip from '../Tooltip/Tooltip';
import type { TooltipBaseProps } from '../Tooltip/TooltipBase';

export type LabelRowProps = {
  readonly children?: never;
  readonly description?: string;
  readonly endAdornment?: React.ReactNode;
  readonly label?: string;
  readonly ref?: React.Ref<HTMLLabelElement>;
  readonly required?: boolean;
  readonly requiredText?: string;
  readonly tooltipProps?: TooltipBaseProps;
} & Omit<
  LabelHTMLAttributes<HTMLLabelElement>,
  'autoComplete' | 'children' | 'onBlur' | 'onChange' | 'onClick' | 'ref'
>;

/* Note: If you use htmlfor(or for) attribute, 
  clicking on the label doesn't seem to select the input */

const LabelRow: React.FC<LabelRowProps> = memo(
  ({
    description,
    endAdornment,
    id,
    label,
    ref,
    required = false,
    requiredText,
    tooltipProps,
    ...rest
  }: LabelRowProps): React.JSX.Element => {
    const cleanedTooltipProps = { ...tooltipProps };
    delete cleanedTooltipProps.children;

    return (
      <Label.Root htmlFor={id} ref={ref} {...rest}>
        <StyledRow>
          <StyledLabel>
            {label}
            {required ? (
              <VisuallyHidden.Root>{requiredText}</VisuallyHidden.Root>
            ) : null}
            {required ? (
              <Tooltip.Asterix
                content="Required"
                triggerColor="var(--color-required)"
                {...cleanedTooltipProps}
              />
            ) : null}
          </StyledLabel>
          {description ? <Tooltip.QuestionMark content={description} /> : null}
          {endAdornment}
        </StyledRow>
      </Label.Root>
    );
  },
);
LabelRow.displayName = 'LabelRow';

export default LabelRow;

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
