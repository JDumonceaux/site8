import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

type StyledLinkProps = {
  readonly to: string;
  readonly children?: React.ReactNode;
};

export const StyledLink = ({ to, children }: StyledLinkProps): JSX.Element => (
  <StyleLink to={to}>{children}</StyleLink>
);

const StyleLink = styled(Link)`
  color: #000;
`;
