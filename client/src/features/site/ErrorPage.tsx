import Meta from 'components/core/Meta/Meta';
import styled from 'styled-components';

const ErrorPage: React.FC = (): React.JSX.Element => (
  <>
    <Meta title="Error Page" />
    <Container>
      <Title>Error Page</Title>
      <p>Sorry, something went wrong. Please try again later.</p>
    </Container>
  </>
);

export default ErrorPage;

const Container = styled.div`
  text-align: center;
  margin-top: 20%;
`;

const Title = styled.h1`
  color: red;
`;
