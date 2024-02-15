import { styled } from 'styled-components';

type TwoColumnProps = {
  readonly children: React.ReactNode;
  readonly gap?: string;
  readonly includeGap?: boolean;
};

const StyledDiv = styled.div<{ $gap: string }>`
  display: flex;
  justify-content: space-between;
  gap: ${(props) => props.$gap};
`;

export function TwoColumn({
  children,
  gap,
  includeGap = false,
}: TwoColumnProps): JSX.Element {
  return <StyledDiv $gap={'6px'}>{children}</StyledDiv>;
}
