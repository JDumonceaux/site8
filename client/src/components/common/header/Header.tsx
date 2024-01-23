import { APP_NAME } from '../../../utils/constants';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: var(--main-background-color, #000);
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  min-height: 40px;
`;
const StyledSkipLink = styled.a`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  &:focus {
    position: static;
    width: auto;
    height: auto;
  }
`;
const AppName = styled.div`
  color: var(--palette-grey-10, #fff);
  font-size: 1.1rem;
  padding-left: 16px;
`;

export function Header() {
  return (
    <StyledHeader className='header'>
      <StyledSkipLink href='#main'>Skip to main content</StyledSkipLink>
      <AppName>{APP_NAME}</AppName>
    </StyledHeader>
  );
}
