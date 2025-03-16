d-components';

const PANTONE_LINK = 'https://www.pantone.com/color-of-the-year/2023';

const PantoneColor = (): React.JSX.Element => (
  <WrapperDiv>
    This page is inspired by the{' '}
    <a href={PANTONE_LINK}>2023 Pantone&#174; Color of the Year</a>
    <ColorDiv>
      <div />
      <div>Viva Magenta</div>
    </ColorDiv>
  </WrapperDiv>
);

PantoneColor.displayName = 'PantoneColor';

export default PantoneColor;

const WrapperDiv = styled.div`
  width: 100%;
  font-family: 'Shadows Into Light', cursive;
  font-size: 1.1rem;
  color: var(--palette-grey-100, #000);
  padding: 16px 0;
`;
const ColorDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  & :nth-child(1) {
    background-color: var(--palette-main-color);
    border-radius: 50%;
    min-width: 20px;
    min-height: 20px;
  }
  & :nth-child(2) {
    font-weight: bold;
    color: var(--palette-main-color);
    padding-left: 0.5rem;
  }
`;
