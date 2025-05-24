import type { JSX, LabelHTMLAttributes, Ref } from 'react';

import * as Label from '@radix-ui/react-label';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import styled from 'styled-components';

import Tooltip, { type TooltipProps } from '../Tooltip/Tooltip';

/* Note: If you use htmlFor (or for) attribute,
   clicking on the label doesn't seem to select the input */

export type LabelRowProps = Omit<
  LabelHTMLAttributes<HTMLLabelElement>,
  'autoComplete' | 'children' | 'onBlur' | 'onChange' | 'onClick' | 'ref'
> & {
  /** Additional description tooltip */
  description?: string;
  /** Trailing element (e.g. help icon) */
  endAdornment?: React.ReactNode;
  /** ID of the associated input */
  id?: string;
  /** Visible label text */
  label?: string;
  /** Ref forwarded to the label element */
  ref?: Ref<HTMLLabelElement>;
  /** Marks the field required */
  required?: boolean;
  /** Accessible text for required marker */
  requiredText?: string;
  /** Props for the required-tooltip asterisk */
  tooltipProps?: TooltipProps;
};

/**
 * Renders a form field label row with optional description and adornments
 */
function LabelRow({
  description,
  endAdornment,
  id,
  label,
  ref,
  required = false,
  requiredText,
  tooltipProps,
  ...rest
}: LabelRowProps): JSX.Element {
  return (
    <Label.Root htmlFor={id} ref={ref} {...rest}>
      <Row>
        <Text>
          {label}
          {required ? (
            <>
              <VisuallyHidden.Root>{requiredText}</VisuallyHidden.Root>
              <Tooltip.Asterix
                content="Required"
                triggerColor="var(--color-required)"
                {...tooltipProps}
              />
            </>
          ) : null}
        </Text>
        {description ? <Tooltip.QuestionMark content={description} /> : null}
        {endAdornment}
      </Row>
    </Label.Root>
  );
}

LabelRow.displayName = 'LabelRow';
export default LabelRow;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  > *:first-child {
    flex: 1;
  }
`;

const Text = styled.div`
  color: var(--input-label-color, #ffffff);
  font-size: 15px;
  font-weight: 500;
`;
