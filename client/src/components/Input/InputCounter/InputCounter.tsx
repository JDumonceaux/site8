import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { memo } from 'react';
import { styled } from 'styled-components';

type InputCounterProps = {
  readonly id: string;
  // This should be translated
  readonly assistiveLabel?: string;
  readonly characterCount: number | undefined;
  readonly maxLength: number | undefined;
  readonly showCounter?: boolean;
  readonly align?: 'left' | 'right';
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'id'>;

const InputCounter = ({
  id,
  assistiveLabel = 'Character count',
  showCounter = false,
  characterCount,
  maxLength,
  align = 'right',
  ...rest
}: InputCounterProps): React.JSX.Element => {
  if (!showCounter) {
    return <></>;
  }

  return (
    <StyledDivWrapper
      id={id}
      {...rest}
      data-testid="input-counter"
      aria-live="polite"
      $align={align}>
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
