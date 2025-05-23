import { type FC, memo } from 'react';

import Meta from 'components/core/Meta/Meta';
import styled from 'styled-components';

/**
 * 404 Page – displayed when a route does not match any page.
 */
const NotFoundPage: FC = () => (
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
export default memo(NotFoundPage);

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
    var(--gradient-color-1, hsl(240deg 10% 83%)) 0%,
    var(--gradient-color-2, hsl(211deg 10% 74%)) 9%,
    var(--gradient-color-3, hsl(195deg 10% 60%)) 17%,
    var(--gradient-color-4, hsl(188deg 10% 50%)) 24%,
    var(--gradient-color-5, hsl(184deg 10% 50%)) 32%,
    var(--gradient-color-6, hsl(179deg 10% 49%)) 39%,
    var(--gradient-color-7, hsl(173deg 10% 50%)) 46%,
    var(--gradient-color-8, hsl(167deg 10% 50%)) 55%,
    var(--gradient-color-9, hsl(156deg 10% 58%)) 64%,
    var(--gradient-color-10, hsl(135deg 10% 67%)) 75%,
    var(--gradient-color-11, hsl(105deg 10% 67%)) 87%,
    var(--gradient-color-12, hsl(81deg 10% 20%)) 100%
  );
  width: 100%;
`;

const StyledH1 = styled.h1`
  color: var(--palette-black, #000);
  font-size: clamp(12px, 3vw, 36px);
  padding-top: 10vh;
  text-align: center;
`;
