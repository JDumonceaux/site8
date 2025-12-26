import type { JSX } from 'react';

import Meta from '@components/core/meta/Meta';
import styled from 'styled-components';

/**
 * 404 Page – displayed when a route does not match any page.
 */
const NotFoundPage = (): JSX.Element => (
  <>
    <Meta title="Page not found" />
    <Main aria-labelledby="not-found-heading">
      <StyledDiv>
        <StyledH1 id="not-found-heading">Oops! Page Not Found</StyledH1>
      </StyledDiv>
    </Main>
  </>
);

NotFoundPage.displayName = 'NotFoundPage';
export default NotFoundPage;

// Styled Components
const Main = styled.main`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

const StyledDiv = styled.div`
  background-image: linear-gradient(
    135deg,
    var(--gradient-color-1, oklch(83% 0.01 240)) 0%,
    var(--gradient-color-2, oklch(74% 0.01 211)) 9%,
    var(--gradient-color-3, oklch(60% 0.01 195)) 17%,
    var(--gradient-color-4, oklch(50% 0.01 188)) 24%,
    var(--gradient-color-5, oklch(50% 0.01 184)) 32%,
    var(--gradient-color-6, oklch(49% 0.01 179)) 39%,
    var(--gradient-color-7, oklch(50% 0.01 173)) 46%,
    var(--gradient-color-8, oklch(50% 0.01 167)) 55%,
    var(--gradient-color-9, oklch(58% 0.01 156)) 64%,
    var(--gradient-color-10, oklch(67% 0.01 135)) 75%,
    var(--gradient-color-11, oklch(67% 0.01 105)) 87%,
    var(--gradient-color-12, oklch(20% 0.01 81)) 100%
  );
  width: 100%;
`;

const StyledH1 = styled.h1`
  color: var(--palette-black, #000);
  font-size: clamp(12px, 3vw, 36px);
  padding-top: 10vh;
  text-align: center;
`;
