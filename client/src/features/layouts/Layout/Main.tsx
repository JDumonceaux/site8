import { type JSX, useTransition } from 'react';

import styled from 'styled-components';

/**
 * Main content area layout component following SOLID principles.
 */
type MainProps = {
  /** The primary content to display in this section */
  children: React.ReactNode;
};

const Main = ({ children }: MainProps): JSX.Element | null => {
  const [isPending, startTransition] = useTransition();

  // Optionally defer rendering heavy content
  const renderContent = () => {
    startTransition(() => {
      // No additional state updates needed; children render optimistically
    });
  };

  return (
    <MainContainer
      aria-busy={isPending}
      data-testid="main"
      onLoad={renderContent}
    >
      {children}
    </MainContainer>
  );
};

Main.displayName = 'Main';
export default Main;

// Styled component for the main layout
const MainContainer = styled.main`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 1rem;
`;
