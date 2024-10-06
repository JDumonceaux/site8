import React, { TextareaHTMLAttributes } from 'react';
import { styled } from 'styled-components';
import FieldLabel, { FieldLabelProps } from './FieldLabel/FieldLabel';


type TextAreaProps = {
  readonly id: string;
  readonly rows: number;
  readonly textareaRef?: React.RefObject<HTMLTextAreaElement>;
} & Omit<FieldLabelProps, 'children' | 'ref'> &
  Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'id' | 'name' | 'ref' | 'rows'
  >;

export const TextArea = ({
  id,
  rows,
  textareaRef,
  ...rest
}: TextAreaProps): React.JSX.Element => (
  <FieldLabel id={id} {...rest} label={rest.label}>
    <StyledTextArea id={id} name={id} ref={textareaRef} rows={rows} {...rest} />
  </FieldLabel>
);

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
