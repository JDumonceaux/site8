import type { JSX } from 'react';

import StickyMenuWrapper from '@components/layout/StickyMenuWrapper';
import styled, { keyframes } from 'styled-components';

const SectionsGroupsSkeleton = (): JSX.Element => {
  return (
    <Container>
      <SkeletonTitle />
      <List>
        {Array.from({ length: 3 }).map((_section, sectionIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <SectionItem key={sectionIndex}>
            <SkeletonSectionName />
            <GroupList>
              {Array.from({ length: 4 }).map((_group, groupIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <SkeletonGroupItem key={groupIndex}>
                  <SkeletonGroupName />
                  <SkeletonItemCount />
                </SkeletonGroupItem>
              ))}
            </GroupList>
          </SectionItem>
        ))}
      </List>
    </Container>
  );
};

export default SectionsGroupsSkeleton;

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
  border-radius: 0.25rem;
`;

const Container = styled(StickyMenuWrapper)`
  max-height: calc(100vh - 5rem);
  overflow-y: auto;
`;

const SkeletonTitle = styled(SkeletonBase)`
  height: 1rem;
  width: 8rem;
  margin-bottom: 0.5rem;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SectionItem = styled.li`
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SkeletonSectionName = styled(SkeletonBase)`
  height: 0.875rem;
  width: 6rem;
  margin-bottom: 0.25rem;
`;

const GroupList = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0.75rem;
`;

const SkeletonGroupItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.375rem;
  margin: 0.0625rem 0;
`;

const SkeletonGroupName = styled(SkeletonBase)`
  flex: 1;
  height: 0.75rem;
  width: 4rem;
`;

const SkeletonItemCount = styled(SkeletonBase)`
  height: 0.625rem;
  width: 1.5rem;
`;
