import { memo } from 'react';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { styled } from 'styled-components';

type InputCounterProps = {
  readonly align?: 'left' | 'right';
  // This should be translated
  readonly assistiveLabel?: string;
  readonly characterCount: number | undefined;
  readonly id: string;
  readonly maxLength: number | undefined;
  readonly showCounter?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'id'>;

const InputCounter = ({
  align = 'right',
  assistiveLabel = 'Character count',
  characterCount,
  id,
  maxLength,
  showCounter = false,
  ...rest
}: InputCounterProps): React.JSX.Element => {
  if (!showCounter) {
    return <></>;
  }

  return (
    <StyledDivWrapper
      id={id}
      {...rest}
      $align={align}
      aria-live="polite"
      data-testid="input-counter">
      <VisuallyHidden>{assistiveLabel}:</VisuallyHidden> {characterCount ?? 0} /
      {maxLength ?? 0}
    </StyledDivWrapper>
  );
};

InputCounter.displayName = 'InputCounter';

export default memo(InputCounter);

const StyledDivWrapper = styled.div<{ $align?: 'left' | 'right' }>`
  font-size: 0.75rem;
  text-align: ${({ $align }) => $align};
`;
// const VisuallyHidden = styled.span`
//   &:not(:focus):not(:active) {
//     clip: rect(0 0 0 0);
//     clip-path: inset(50%);
//     height: 1px;
//     overflow: hidden;
//     position: absolute;
//     white-space: nowrap;
//     width: 1px;
//   }
// `;
