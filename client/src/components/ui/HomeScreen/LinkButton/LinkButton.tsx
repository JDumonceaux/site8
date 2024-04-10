import StyledLink from 'components/common/Link/StyledLink/StyledLink';
import { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';

type LinkButtonProps = {
  readonly children: React.ReactNode;
  readonly to: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const LinkButton = ({
  to,

  ...rest
}: LinkButtonProps): JSX.Element => (
  <StyledLink to={to}>
    <StyledElement id="button" {...rest} />
  </StyledLink>
);

const StyledElement = styled.button<{
  $margin?: string;
  $variant?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: ${(props) => (props.$margin ? props.$margin : undefined)};
  background-color: #ffffff;
  color: #424242;
  width: 200px;
  min-height: 36px;
  padding: 6px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 1.25px;
  border: none;
  border-radius: 20px;
  box-shadow:
    -3px -3px 10px #c7c7c7,
    ${(props) =>
      props.$variant === 'secondary'
        ? '2px 2px 10px rgba(190,52,85, 0.4), 6px 6px 10px #bebebe'
        : '6px 6px 10px #bebebe'};
  &:hover {
    box-shadow:
      -4px -4px 10px #bebebe,
      2px 2px 10px #c7c7c7;
  }
  > svg {
    position: absolute;
    left: 12px;
  }
`;
