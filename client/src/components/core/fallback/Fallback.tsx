import type { JSX } from 'react';

import PageTitle from '@components/core/page/PageTitle';
import styled, { keyframes } from 'styled-components';

export type FallbackProps = {
  /** Number of loading lines to render (integer between 1 and 10) */
  numberOfLines?: number;
};

type Line = {
  id: string;
  width: number;
};

const MIN_LINES = 1;
const MAX_LINES = 20;
const DEFAULT_LINES = 5;

/**
 * Renders a series of placeholder loading lines with a shimmer effect.
 */
const Fallback = ({
  numberOfLines = DEFAULT_LINES,
}: FallbackProps): JSX.Element => {
  // runtime-validate & clamp
  const raw = Math.floor(numberOfLines);
  let count = raw;
  if (raw < MIN_LINES || raw > MAX_LINES) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `Fallback: 'numberOfLines' must be an integer between ${MIN_LINES} and ${MAX_LINES}, ` +
          `but got ${numberOfLines}. Clamping to range.`,
      );
    }
    count = Math.min(MAX_LINES, Math.max(MIN_LINES, raw));
  }

  const loadingLines: Line[] = Array.from({ length: count }, (_, i) => ({
    id: `line-${i}`,
    width: 100 - (i % 3) * 10,
  }));

  return (
    <LoadingContainer aria-live="polite">
      <PageTitle title="Loading…" />
      {loadingLines.map((line) => (
        <LoadingLine
          key={line.id}
          $width={line.width}
          data-testid="fallback-line"
        />
      ))}
    </LoadingContainer>
  );
};

Fallback.displayName = 'Fallback';
export default Fallback;

/* -- styles -- */

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const LoadingContainer = styled.output`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
`;

const LoadingLine = styled.div<{ $width: number }>`
  height: 1.25rem; /* 20px */
  width: ${(props) => props.$width}%;
  border-radius: 0.375rem; /* 6px */
  background: linear-gradient(
    90deg,
    var(--palette-grey-10) 25%,
    var(--palette-grey-20) 37%,
    var(--palette-grey-10) 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;
