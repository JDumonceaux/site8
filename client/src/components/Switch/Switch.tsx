import * as radixSwitch from '@radix-ui/react-switch';
import type { JSX } from 'react';
import { forwardRef } from 'react';

import styled from 'styled-components';

export type SwitchProps = {
  readonly id: string;
  readonly label: string;
  readonly onCheckedChange?: (checked: boolean) => void;
} & radixSwitch.SwitchProps;

/**
 * A labeled toggle switch component.
 */
const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ id, label, onCheckedChange, ...rest }, ref): JSX.Element => (
    <StyledWrapper>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledSwitchRoot
        ref={ref}
        id={id}
        onCheckedChange={onCheckedChange}
        {...rest}
      >
        <StyledSwitchThumb />
      </StyledSwitchRoot>
    </StyledWrapper>
  ),
);

Switch.displayName = 'Switch';
export default Switch;

const COLOR_TRACK_OFF = 'var(--palette-grey-10)';
const COLOR_TRACK_ON = 'var(--palette-black)';
const COLOR_THUMB = 'var(--palette-main-color)';
const COLOR_TEXT = 'var(--palette-text)';
const SHADOW_COLOR = 'var(--palette-grey-10)';
const OUTLINE_COLOR = 'var(--palette-black)';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLabel = styled.label`
  padding-right: 15px;
  color: ${COLOR_TEXT};
  font-size: inherit;
  cursor: pointer;
`;

const StyledSwitchRoot = styled(radixSwitch.Root)`
  width: 42px;
  height: 25px;
  background-color: ${COLOR_TRACK_OFF};
  border-radius: 9999px;
  position: relative;
  box-shadow: 0 2px 10px ${SHADOW_COLOR};
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${OUTLINE_COLOR};
    outline-offset: 2px;
  }

  &[data-state='checked'] {
    background-color: ${COLOR_TRACK_ON};
  }

  &[data-disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StyledSwitchThumb = styled(radixSwitch.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: ${COLOR_THUMB};
  border-radius: 9999px;
  box-shadow: 0 2px 2px ${SHADOW_COLOR};
  transform: translateX(2px);
  will-change: transform;

  @media (prefers-reduced-motion: no-preference) {
    transition: transform 120ms ease;
  }

  &[data-state='checked'] {
    transform: translateX(${42 - 21 - 2}px);
  }
`;
