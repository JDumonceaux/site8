import type { JSX } from 'react';

import { TestsContainer } from '@features/tests/TestsPage.styles';
import styled, { keyframes } from 'styled-components';

const TestsSkeleton = (): JSX.Element => {
  return (
    <TestsContainer>
      {Array.from({ length: 2 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <SkeletonSection key={index}>
          <SkeletonTitle />
          <SkeletonParagraph width="50%" />
          <SkeletonGroup>
            <SkeletonGroupTitle />
            <SkeletonTags>
              <SkeletonTag />
              <SkeletonTag />
              <SkeletonTag />
            </SkeletonTags>
            <SkeletonList>
              {Array.from({ length: 3 }).map((_item, itemIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <SkeletonItem key={itemIndex}>
                  <SkeletonLine width="70%" />
                  <SkeletonLine width="90%" />
                </SkeletonItem>
              ))}
            </SkeletonList>
          </SkeletonGroup>
        </SkeletonSection>
      ))}
    </TestsContainer>
  );
};

export default TestsSkeleton;

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
  border-radius: 6px;
`;

const SkeletonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SkeletonTitle = styled(SkeletonBase)`
  height: 1.5rem;
  width: 40%;
`;

const SkeletonParagraph = styled(SkeletonBase)<{ width?: string }>`
  height: 1rem;
  width: ${(props) => props.width ?? '100%'};
`;

const SkeletonGroup = styled.div`
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-lg);
  background: var(--surface-background-color);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SkeletonGroupTitle = styled(SkeletonBase)`
  height: 1.25rem;
  width: 45%;
`;

const SkeletonTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkeletonTag = styled(SkeletonBase)`
  height: 1.25rem;
  width: 3.5rem;
`;

const SkeletonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SkeletonItem = styled.div`
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-md);
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SkeletonLine = styled(SkeletonBase)<{ width?: string }>`
  height: 0.9rem;
  width: ${(props) => props.width ?? '100%'};
`;
