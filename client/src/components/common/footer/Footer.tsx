import ChangeLanguage from '../../../components/examples/ChangeLanguage/ChangeLanguage';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  min-height: 20px;
  background-color: var(--main-background-color, #000);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`;
const StyledCopyright = styled.div`
  color: var(--palette-grey-10, #fff);
  font-size: 0.8rem;
  padding-left: 16px;
`;

export function Footer() {
  const thisYear = new Date().getFullYear();
  return (
    <StyledFooter role='contentinfo' className='footer'>
      <StyledCopyright aria-label='Copyright Information'>
        Copyright &copy; {thisYear}
      </StyledCopyright>
      <ChangeLanguage />
    </StyledFooter>
  );
}
