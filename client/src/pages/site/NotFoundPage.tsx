import Meta from 'components/core/Meta/Meta';
import { styled } from 'styled-components';

const NotFoundPage = (): JSX.Element => (
  <>
    <Meta title="Page not found" />
    <StyledDiv>
      <StyledH1>Oops! Page Not Found</StyledH1>
    </StyledDiv>
  </>
);

export default NotFoundPage;

// https://www.joshwcomeau.com/gradient-generator/
const StyledDiv = styled.div`
  min-height: 100vh;
  background-image: linear-gradient(
    135deg,
    hsl(240deg 10% 83%) 0%,
    hsl(211deg 10% 74%) 9%,
    hsl(195deg 10% 60%) 17%,
    hsl(188deg 10% 50%) 24%,
    hsl(184deg 10% 50%) 32%,
    hsl(179deg 10% 49%) 39%,
    hsl(173deg 10% 50%) 46%,
    hsl(167deg 10% 50%) 55%,
    hsl(156deg 10% 58%) 64%,
    hsl(135deg 10% 67%) 75%,
    hsl(105deg 10% 67%) 87%,
    hsl(81deg 10% 20%) 100%
  );
`;
const StyledH1 = styled.h1`
  color: var(--palette-black, #000);
  text-align: center;
  padding-top: 10vh;
  font-size: clamp(12px, 3vw, 36px);
`;
