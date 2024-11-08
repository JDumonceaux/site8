import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  memo,
  useId,
} from 'react';
import styled from 'styled-components';
import ClearAdornment from '../Adornments/ClearAdornment';
import StartAdornment from '../Adornments/StartAdornment';
import { TooltipBaseProps } from '../Tooltip/TooltipBase';
import LabelRow, { LabelRowProps } from '../LabelRow/LabelRow';
import FooterRow from '../FooterRow/FooterRow';

type FieldWrapperProps = {
  readonly endAdornment?: React.ReactNode;
  readonly startAdornment?: React.ReactNode;
  readonly showClear?: boolean;
  readonly allowedCharacters?: RegExp;
} & LabelRowProps;

const FieldWrapper = ({
  endAdornment,
  startAdornment,
  showClear = false,
  required,
  children,
  ...rest
}: FieldWrapperProps): JSX.Element => {
  const tempId = rest.id || useId();
  const props = { ...rest, id: tempId, required: required };

  return (
    <div id={tempId}>
      <LabelRow {...props} />
      <StyledDiv>
        <StartAdornment>{startAdornment}</StartAdornment>
        {children}
        {/* {showClear ? <ClearAdornment onClick={handleClear} /> : null} */}
        {/* <EndAdornment>{endAdornment}</EndAdornment> */}
      </StyledDiv>
      <FooterRow {...rest} />
    </div>
  );
};

FieldWrapper.displayName = 'FieldWrapper';

export default memo(FieldWrapper);

export type { FieldWrapperProps };

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: var(--input-color);
  background-color: var(--input-background-color);
  border-radius: var(--input-border-radius, 0);
  border: 1px solid var(--input-border-color);
  width: 100%;
  :focus {
    outline: none;
  }
  :focus-visible {
    outline: none;
    background-color: var(--input-background-focus-color);
    border-bottom: 1.5px solid var(--input-border-focus-color);
  }

  // &:focus:within {
  //   box-shadow: 0 0 0 1px var(--input-border-focus-color);
  // }
  &:has(input[required]) {
    border-left: 3px solid var(--input-border-required-color);
  }
`;
