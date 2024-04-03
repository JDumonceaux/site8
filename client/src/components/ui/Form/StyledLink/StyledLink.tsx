import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

type StyledLinkProps = {
  readonly to?: string;
  readonly href?: string;
  readonly children?: React.ReactNode;
};

export const StyledLink = ({
  to,
  href,
  children,
}: StyledLinkProps): JSX.Element => {
  if (href) {
    return (
      <StyledA as="a" href={href}>
        {children}
      </StyledA>
    );
  }
  if (to) {
    return <StyledElement to={to}>{children}</StyledElement>;
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

const StyledElement = styled(Link)`
  color: #000;
`;
const StyledA = styled.a`
  color: #000;
`;
