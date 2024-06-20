import { styled } from 'styled-components';

export const MenuIcon = (): JSX.Element => {
  return (
    <WrapperSpan>
      <TitleSpan>Menu</TitleSpan>
    </WrapperSpan>
  );
};

const WrapperSpan = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const TitleSpan = styled.span`
  color: var(--palette-white, #fff);
  font-size: 0.7rem;
  font-weight: 400;
  justify-content: center;
  letter-spacing: 0.04em;
  line-height: 20px;
  margin: 0;
  padding: 0px 12px;
  text-transform: uppercase;
  white-space: nowrap;
  width: 100%;
  &:before {
    content: '';
    display: block;
    border-top: 1px solid var(--palette-white, #fff);
    border-style: double;
    margin-bottom: 1px;
  }
  &:after {
    content: '';
    display: block;
    border-top: 1px solid var(--palette-white, #fff);
    border-style: double;
    margin-top: 1px;
  }
`;
