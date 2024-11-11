import React, { TextareaHTMLAttributes } from 'react';
import { styled } from 'styled-components';
import FieldLabel, { FieldLabelProps } from './FieldLabel/FieldLabel';

type TextAreaProps = {
  readonly ref?: React.RefObject<HTMLTextAreaElement>;
} & Omit<FieldLabelProps, 'children' | 'ref'> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'ref'>;

export const TextArea = ({
  ref,
  ...rest
}: TextAreaProps): React.JSX.Element => {
  const tempId = rest.id || 'text-area';
  return (
    <FieldLabel id={tempId} {...rest} label={rest.label}>
      <StyledTextArea id={tempId} name={tempId} ref={ref} {...rest} />
    </FieldLabel>
  );
};

const StyledTextArea = styled.textarea`
  background-color: var(--palette-white, #fff);
  font-size: 1rem;
  letter-spacing: 0.5px;
  line-height: 20px;
  padding-block-end: 6px;
  padding-block-start: 6px;
  padding-inline-end: 6px;
  padding-inline-start: 6px;
  padding: 6px 6px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  &:hover {
    border-color: #63544f;
  }
  &:focus {
    border-color: #6db144;
    border-width: 2px;
  }
`;
