import { styled, keyframes } from 'styled-components';
import { HomeMenu } from 'components/common/Menu/MainMenu/HomeMenu';
import { LinkButton } from '../Form';

export const HomeScreen5 = (): JSX.Element => {
  return (
    <>
      <StyledSection>
        <Title>React Notes</Title>
        <LinkButton id="css" to="/css">
          CSS
        </LinkButton>
      </StyledSection>
      <StyledSection>
        <HomeMenu />
      </StyledSection>
    </>
  );
};

const StyledSection = styled.section`
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
`;
const lpcAnimation3 = keyframes`
 0% { transform: translateY(800px);}
 100% { transform: translateY(0%); }
`;
const Title = styled.div`
  background: url('/images/background/title.jpg') no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 8rem;
  //mix-blend-mode: difference;
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(0.17, 0.67, 0.9, 1.2);
  animation-name: ${lpcAnimation3};
`;
