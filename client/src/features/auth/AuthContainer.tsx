import Layout from 'components/layouts/Layout/Layout';
import { styled } from 'styled-components';

type AuthContainerProps = {
  readonly children: React.ReactNode;
  readonly error: null | { code: string; message: string };
  readonly leftImage: React.ReactNode;
  readonly title: string;
};

const AuthContainer = ({
  children,
  error,
  leftImage,
  title,
}: AuthContainerProps): React.JSX.Element => {
  return (
    <Layout.Main>
      <StyledGrid>
        <StyledLeft aria-hidden="true">{leftImage}</StyledLeft>
        <StyledRight>
          <StyledH1>{title}</StyledH1>
          {error ? (
            <StyledDivError id="error">
              <div>Oops! There was an error:</div>
              <div>{error.message}</div>
            </StyledDivError>
          ) : null}
          {children}
        </StyledRight>
      </StyledGrid>
    </Layout.Main>
  );
};

export default AuthContainer;

const StyledDivError = styled.div`
  border: 1px solid var(--palette-error);
  color: var(--palette-error);
  padding: 12px 16px;
  font-size: 0.9rem;
  margin-bottom: 20px;
`;
const StyledGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 940px;
  margin: 0 auto;
  margin-top: 60px;
  container: parent;
  container-type: inline-size;
`;
const StyledRight = styled.div`
  @container parent (inline-size > 430px) {
    width: 50%;
    min-width: 360px;
    padding: 0 16px;
  }
  width: 100%;
  max-width: 430px;
  padding: 0 20px;
  margin: 0 auto;
`;
const StyledLeft = styled.div`
  @container parent (inline-size > 430px) {
    margin: 0 auto;
    width: 50%;
    padding: 0 40px;
    max-width: unset;
  }
  margin-left: auto;
  width: 100%;
  max-width: 100px;
  padding: 0 20px 20px 20px;
  > img {
    box-shadow:
      -3px -3px 10px #c7c7c7,
      6px 6px 10px #bebebe;
  }
`;
const StyledH1 = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
`;
