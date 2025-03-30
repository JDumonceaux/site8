import { type FC, memo } from 'react';

import styled from 'styled-components';

import EndAdornment, {
  type EndAdornmentProps,
} from '../Adornments/EndAdornment';
import StartAdornment, {
  type StartAdornmentProps,
} from '../Adornments/StartAdornment';
import FooterRow, { type FooterRowProps } from '../FooterRow/FooterRow';
import LabelRow, { type LabelRowProps } from '../LabelRow/LabelRow';

export type FieldWrapperProps = {
  readonly children?: React.ReactNode;
  readonly endAdornment?: React.ReactNode;
  readonly endAdornmentProps?: EndAdornmentProps;
  readonly footerRowProps?: FooterRowProps;
  readonly id?: string;
  readonly labelProps?: LabelRowProps;
  readonly onClear?: () => void;
  readonly ref?: React.Ref<HTMLDivElement>;
  readonly startAdornment?: React.ReactNode;
  readonly startAdornmentProps?: StartAdornmentProps;
};

const FieldWrapper: FC<FieldWrapperProps> = memo(
  ({
    children,
    endAdornment,
    endAdornmentProps,
    footerRowProps,
    id,
    labelProps,
    ref,
    startAdornment,
    startAdornmentProps,
  }: FieldWrapperProps): React.JSX.Element => {
    return (
      <div id={id} ref={ref}>
        <LabelRow {...labelProps} />
        <StyledDiv>
          <StartAdornment {...startAdornmentProps}>
            {startAdornment}
          </StartAdornment>
          {children}
          <EndAdornment {...endAdornmentProps}>{endAdornment}</EndAdornment>
        </StyledDiv>
        <FooterRow {...footerRowProps} />
      </div>
    );
  },
);

FieldWrapper.displayName = 'FieldWrapper';

export default FieldWrapper;

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
