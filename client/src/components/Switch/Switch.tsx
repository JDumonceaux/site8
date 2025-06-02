import type { JSX } from 'react';

import * as radixSwitch from '@radix-ui/react-switch';
import styled from 'styled-components';

export type SwitchProps = {
  readonly id: string;
  readonly label: string;
  readonly onCheckedChanged?: (checked: boolean) => void;
} & radixSwitch.SwitchProps;

/**
 * A labeled toggle switch component.
 */
export const Switch = ({
  id,
  label,
  onCheckedChanged,
  ...rest
}: SwitchProps): JSX.Element | null => (
  <StyledWrapper>
    <StyledLabel htmlFor={id}>{label}</StyledLabel>
    <StyledSwitchRoot id={id} onCheckedChange={onCheckedChanged} {...rest}>
      <StyledSwitchThumb />
    </StyledSwitchRoot>
  </StyledWrapper>
);

Switch.displayName = 'Switch';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLabel = styled.label`
  padding-right: 15px;
  color: var(--palette-text);
  font-size: inherit;
`;

const StyledSwitchRoot = styled(radixSwitch.Root)`
  width: 42px;
  height: 25px;
  background-color: #dcdcdc;
  border-radius: 9999px;
  position: relative;
  box-shadow: 0 2px 10px #dcdcdc;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:focus {
    box-shadow: 0 0 0 2px black;
  }

  &[data-state='checked'] {
    background-color: black;
  }
`;

const StyledSwitchThumb = styled(radixSwitch.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: red;
  border-radius: 9999px;
  box-shadow: 0 2px 2px #dcdcdc;
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;

  &[data-state='checked'] {
    transform: translateX(19px);
  }
`;
