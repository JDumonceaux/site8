import { styled } from 'styled-components';

type TwoColumnProps = {
  readonly children: React.ReactNode;
  readonly includeGap?: boolean;
  readonly includeMargin?: boolean;
};

export function TwoColumn({
  children,
  includeGap = false,
  includeMargin = false,
}: TwoColumnProps): JSX.Element {
  return (
    <StyledDiv $includeGap={includeGap} $margin={includeMargin}>
      {children}
    </StyledDiv>
  );
}

const StyledDiv = styled.div<{ $includeGap: boolean; $margin: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: ${(props) => (props.$includeGap ? '12px' : '0')};
  margin-bottom: ${(props) => (props.$margin ? '12px' : '0')};
`;
