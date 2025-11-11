import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import type { HTMLAttributes, JSX } from 'react';

import styled from 'styled-components';

export type InputCounterProps = HTMLAttributes<HTMLDivElement> & {
  readonly align?: 'left' | 'right';
  // This should be translated
  readonly assistiveLabel?: string;
  readonly characterCount?: number;
  readonly id: string;
  readonly maxLength?: number;
  readonly showCounter?: boolean;
};

const InputCounter = ({
  align = 'right',
  assistiveLabel = 'Character count',
  characterCount = 0,
  id,
  maxLength = 0,
  showCounter = false,
  ...rest
}: InputCounterProps): JSX.Element | null => {
  if (!showCounter) return null;

  return (
    <Counter
      $align={align}
      aria-live="polite"
      data-testid="input-counter"
      id={id}
      {...rest}
    >
      <VisuallyHidden>{assistiveLabel}:</VisuallyHidden>
      {` ${characterCount} / ${maxLength}`}
    </Counter>
  );
};

InputCounter.displayName = 'InputCounter';
export default InputCounter;

const Counter = styled.div<{ $align: 'left' | 'right' }>`
  font-size: 0.75rem;
  text-align: ${({ $align }) => $align};
`;
