import React, { memo, useMemo } from 'react';

import useGetId from 'hooks/useGetId';
import styled from 'styled-components';

import StartAdornment from '../Adornments/StartAdornment';
import FooterRow from '../FooterRow/FooterRow';
import LabelRow, { type LabelRowProps } from '../LabelRow/LabelRow';

type FieldWrapperProps = {
  readonly allowedCharacters?: RegExp;
  readonly endAdornment?: React.ReactNode;
  readonly showClear?: boolean;
  readonly startAdornment?: React.ReactNode;
} & LabelRowProps;

const FieldWrapper = memo(
  ({
    children,
    endAdornment,
    id,
    required,
    showClear = false,
    startAdornment,
    ...rest
  }: FieldWrapperProps) => {
    const currId = useGetId(id);

    const props = useMemo(
      () => ({ ...rest, id: currId, required }),
      [rest, currId, required],
    );
    const memoizedRest = useMemo(() => rest, [rest]);

    return (
      <div id={currId}>
        <LabelRow {...props} />
        <StyledDiv>
          <StartAdornment>{startAdornment}</StartAdornment>
          {children}
        </StyledDiv>
        <FooterRow {...memoizedRest} />
      </div>
    );
  },
);

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
