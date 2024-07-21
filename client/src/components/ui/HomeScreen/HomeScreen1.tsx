import HomeMenu from 'components/common/Menu/HomeMenu';
import Meta from 'components/common/Meta/Meta';
import { MatrixBG } from 'components/ui/Animation/MatrixBG';
import { styled } from 'styled-components';

const HomeScreen1 = (): JSX.Element => {
  const title = 'Home';

  return (
    <>
      <Meta title={title} />
      <StyledWrapper>
        <StyledMain>
          <StyledSection>
            <p>Welcome!</p>
            <p>
              The is the skeleton of a site to give you some ideas. Hopefully,
              I&#39;ll be able to expand on all these topics in 2024.
            </p>
            <p>
              There are many excellent tutorials on building React web site.
            </p>
            <p>
              My goal is to bring everything together: to give you the whole
              picture.
            </p>
          </StyledSection>
          <section>
            <MatrixBG />
          </section>
          <StyledAside>
            <p>“Three may keep a secret, if two of them are dead.”</p>
            <p>― Benjamin Franklin, Poor Richard&#39;s Almanack</p>
          </StyledAside>
        </StyledMain>
        <HomeMenu />
      </StyledWrapper>
    </>
  );
};

export default HomeScreen1;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  margin-top: 40px;
`;
const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  width: 360px;
  height: calc(100vh - 80px);
  background-color: darkkhaki;
  padding: 16px;
  font-size: 1.1rem;
  padding-left: 12px;
`;
const StyledSection = styled.section`
  flex-grow: 1;
`;
const StyledAside = styled.aside`
  font-size: 0.85rem;
  font-style: italic;
  & p {
    margin: 0;
  }
`;
