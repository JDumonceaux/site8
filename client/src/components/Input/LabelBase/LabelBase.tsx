import * as Label from '@radix-ui/react-label';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import React, { LabelHTMLAttributes, memo } from 'react';
import { styled } from 'styled-components';

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
      <StyledRequired>
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button className="IconButton">SS</button>
            </Tooltip.Trigger>
            <Tooltip.Content>Required</Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
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
