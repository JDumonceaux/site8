import { memo, type JSX } from 'react';

import PageTitle from 'components/core/PageTitle/PageTitle';
import styled, { keyframes } from 'styled-components';

export type FallbackProps = {
  /** Number of loading lines to render (integer between 1 and 10) */
  lines?: number;
};

const MIN_LINES = 1;
const MAX_LINES = 20;
const DEFAULT_LINES = 5;

/**
 * Renders a series of placeholder loading lines with a shimmer effect.
 */
const Fallback = ({ lines = DEFAULT_LINES }: FallbackProps): JSX.Element => {
  // runtime-validate & clamp
  const raw = Math.floor(lines);
  let count = raw;
  if (raw < MIN_LINES || raw > MAX_LINES) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `Fallback: 'lines' must be an integer between ${MIN_LINES} and ${MAX_LINES}, ` +
          `but got ${lines}. Clamping to range.`,
      );
    }
    count = Math.min(MAX_LINES, Math.max(MIN_LINES, raw));
  }

  const widths = Array.from({ length: count }).map(
    (_, i) => 100 - (i % 3) * 10,
  );

  return (
    <LoadingContainer aria-live="polite">
      <PageTitle title="Loading…" />
      {widths.map((w, idx) => (
        <LoadingLine key={idx} style={{ width: `${w}%` }} />
      ))}
    </LoadingContainer>
  );
};

const MemoFallback = memo(Fallback);
MemoFallback.displayName = 'Fallback';
export default MemoFallback;

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

const LoadingLine = styled.div`
  height: 1.25rem; /* 20px */
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
