import type { JSX } from 'react';

import styled, { keyframes } from 'styled-components';

/**
 * Skeleton loading component for Items
 * Displays placeholder cards while travel data is loading
 */
const Skeleton = (): JSX.Element => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <SkeletonCard key={index}>
          <SkeletonCardContent>
            <SkeletonTextContent>
              <SkeletonHeading />
              <SkeletonLocation />
              <SkeletonParagraph />
              <SkeletonParagraph width="80%" />
              <SkeletonTags>
                <SkeletonTag />
                <SkeletonTag />
                <SkeletonTag />
              </SkeletonTags>
            </SkeletonTextContent>
            <SkeletonImagePlaceholder />
          </SkeletonCardContent>
        </SkeletonCard>
      ))}
    </>
  );
};

Skeleton.displayName = 'Skeleton';

export default Skeleton;

// Animation
const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    to right,
    var(--hover-background) 8%,
    var(--border-light) 18%,
    var(--hover-background) 33%
  );
  background-size: 800px 104px;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: 4px;
`;

const SkeletonCard = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  background-color: var(--surface-background-color);
`;

const SkeletonCardContent = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const SkeletonTextContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const SkeletonImagePlaceholder = styled(SkeletonBase)`
  width: 200px;
  height: 150px;
  flex-shrink: 0;
  border-radius: 4px;
`;

const SkeletonHeading = styled(SkeletonBase)`
  height: 1.5rem;
  width: 60%;
  margin-bottom: 0.5rem;
`;

const SkeletonLocation = styled(SkeletonBase)`
  height: 1rem;
  width: 40%;
  margin-bottom: 0.75rem;
`;

const SkeletonParagraph = styled(SkeletonBase)<{ width?: string }>`
  height: 1rem;
  width: ${(props) => props.width ?? '100%'};
  margin-bottom: 0.5rem;
`;

const SkeletonTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const SkeletonTag = styled(SkeletonBase)`
  height: 1.5rem;
  width: 4rem;
`;
