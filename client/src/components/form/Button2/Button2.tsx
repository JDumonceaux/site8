import { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';

type Button2Props = {
  readonly children: React.ReactNode;
  readonly icon?: React.ReactNode;
  readonly id: string;
  readonly marginBottom?: string;
  readonly variant?: 'primary' | 'secondary';
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'name'>;

export const Button2 = ({
  children,
  icon,
  id,
  marginBottom,
  variant = 'primary',
  ...rest
}: Button2Props): React.JSX.Element => (
  <StyledButton
    $margin={marginBottom}
    $variant={variant}
    id={id}
    name={id}
    {...rest}>
    {icon}
    {children}
  </StyledButton>
);

const StyledButton = styled.button<{
  $margin?: string;
  $variant?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: ${(props) => props.$margin ?? undefined};
  background-color: #ffffff;
  color: #424242;
  width: 100%;
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
