import type { JSX } from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * Loading skeleton component for TravelMenu
 * Displays animated placeholder content while menu data is being fetched
 */
const TravelMenuSkeleton = (): JSX.Element => {
  return (
    <StyledSkeletonContainer>
      <StyledTitle />

      {/* Country level items (3) */}
      <StyledCountryItem />
      <StyledCountryItem />
      <StyledCountryItem />

      {/* Show one expanded section with cities */}
      <StyledCountryItem />
      <StyledCityItem />
      <StyledCityItem />

      <StyledCountryItem />
      <StyledCountryItem />
    </StyledSkeletonContainer>
  );
};

TravelMenuSkeleton.displayName = 'TravelMenuSkeleton';
export default TravelMenuSkeleton;

// Shimmer animation
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const StyledSkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0;
`;

const StyledSkeletonBase = styled.div`
  height: 1.5rem;
  background: linear-gradient(
    90deg,
    var(--navbar-dark-primary) 0%,
    var(--navbar-dark-secondary) 50%,
    var(--navbar-dark-primary) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: 4px;
`;

const StyledTitle = styled(StyledSkeletonBase)`
  height: 2rem;
  width: 80%;
  margin-bottom: 1rem;
`;

const StyledCountryItem = styled(StyledSkeletonBase)`
  width: 90%;
  margin-left: 0.5rem;
`;

const StyledCityItem = styled(StyledSkeletonBase)`
  width: 75%;
  margin-left: 2rem;
  height: 1.25rem;
`;
