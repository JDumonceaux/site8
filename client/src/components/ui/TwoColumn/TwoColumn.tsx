import { styled } from 'styled-components';

type TwoColumnProps = {
  readonly children: React.ReactNode;
  readonly includeGap?: boolean;
  readonly includeMargin?: boolean;
};

const TwoColumn = ({
  children,
  includeGap = false,
  includeMargin = false,
}: TwoColumnProps): JSX.Element => (
  <StyledDiv $includeGap={includeGap} $margin={includeMargin}>
    {children}
  </StyledDiv>
);

export default TwoColumn;

const StyledDiv = styled.div<{ $includeGap: boolean; $margin: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: ${(props) => (props.$includeGap ? '12px' : '0')};
  margin-bottom: ${(props) => (props.$margin ? '12px' : '0')};
`;
