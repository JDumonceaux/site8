import type { HTMLAttributes, JSX, ReactNode } from 'react';

import EndAdornment, {
  type EndAdornmentProps,
} from '../adornments-temp/EndAdornment';
import StartAdornment, {
  type StartAdornmentProps,
} from '../adornments-temp/StartAdornment';
import FooterRow, { type FooterRowProps } from '../footer-row/FooterRow';
import LabelRow, { type LabelRowProps } from '../label-row/LabelRow';
import styled from 'styled-components';

export type FieldWrapperProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  /** Trailing adornment element */
  endAdornment?: ReactNode;
  /** Props for the trailing adornment */
  endAdornmentProps?: EndAdornmentProps;
  /** Unique identifier for the wrapper */
  id?: string;
  /** Whether the field is required */
  isRequired?: boolean;
  label?: string;
  /** Props for the label row (children are omitted) */
  labelProps?: Omit<LabelRowProps, 'children'>;
  /** Leading adornment element */
  startAdornment?: ReactNode;
  /** Props for the leading adornment */
  startAdornmentProps?: StartAdornmentProps;
} & FooterRowProps;

const EMPTY_LABEL_PROPS: Omit<LabelRowProps, 'children'> = {};

const FieldWrapper = ({
  children,
  endAdornment,
  endAdornmentProps,
  id,
  isRequired = false,
  label,
  labelProps = EMPTY_LABEL_PROPS,
  startAdornment,
  startAdornmentProps,
  ...footerProps
}: FieldWrapperProps): JSX.Element => {
  return (
    <Container id={id}>
      <LabelRow
        isRequired={isRequired}
        label={label}
        {...labelProps}
      />
      <InputRow>
        {startAdornment ? (
          <StartAdornment {...startAdornmentProps}>
            {startAdornment}
          </StartAdornment>
        ) : null}
        {children}
        {endAdornment ? (
          <EndAdornment {...endAdornmentProps}>{endAdornment}</EndAdornment>
        ) : null}
      </InputRow>
      <FooterRow {...footerProps} />
    </Container>
  );
};

FieldWrapper.displayName = 'FieldWrapper';
export default FieldWrapper;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: var(--input-color);
  background-color: var(--input-background-color);
  border: 1px solid var(--input-border-color);
  border-radius: var(--input-border-radius, 0);

  &:focus-within {
    outline: none;
    background-color: var(--input-background-focus-color);
    border-bottom: 1.5px solid var(--input-border-focus-color);
  }

  &:has(input[required]) {
    border-left: 3px solid var(--input-border-required-color);
  }
`;
