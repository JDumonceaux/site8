import { type JSX, type ReactNode, type HTMLAttributes, memo } from 'react';

import styled from 'styled-components';

import EndAdornment, {
  type EndAdornmentProps,
} from '../Adornments/EndAdornment';
import StartAdornment, {
  type StartAdornmentProps,
} from '../Adornments/StartAdornment';
import FooterRow, { type FooterRowProps } from '../FooterRow/FooterRow';
import LabelRow, { type LabelRowProps } from '../LabelRow/LabelRow';

/**
 * Props for wrapping a form field with optional label, adornments, and footer.
 */
export type FieldWrapperProps = HTMLAttributes<HTMLDivElement> & {
  /** Trailing adornment element */
  endAdornment?: ReactNode;
  /** Props for the trailing adornment */
  endAdornmentProps?: EndAdornmentProps;
  /** Unique identifier for the wrapper */
  id?: string;
  /** Props for the label row (children are omitted) */
  labelProps?: Omit<LabelRowProps, 'children'>;
  /** Whether the field is required */
  required?: boolean;
  /** Leading adornment element */
  startAdornment?: ReactNode;
  /** Props for the leading adornment */
  startAdornmentProps?: StartAdornmentProps;
} & FooterRowProps;

/**
 * Wraps a form field with optional label, adornments, and footer.
 */
function FieldWrapper({
  children,
  endAdornment,
  endAdornmentProps,
  id,
  labelProps = {},
  required = false,
  startAdornment,
  startAdornmentProps,
  ...footerProps
}: FieldWrapperProps): JSX.Element {
  const { ...filteredLabelProps } = labelProps;

  return (
    <Container id={id}>
      <LabelRow {...filteredLabelProps} required={required} />
      <InputRow>
        {startAdornment && (
          <StartAdornment {...startAdornmentProps}>
            {startAdornment}
          </StartAdornment>
        )}
        {children}
        {endAdornment && (
          <EndAdornment {...endAdornmentProps}>{endAdornment}</EndAdornment>
        )}
      </InputRow>
      <FooterRow {...footerProps} />
    </Container>
  );
}

FieldWrapper.displayName = 'FieldWrapper';
export default memo(FieldWrapper);

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
