import { styled } from 'styled-components';

export const Footer = (): JSX.Element => {
  const thisYear = new Date().getFullYear();
  return (
    <StyledFooter data-testid="footer" role="contentinfo">
      <StyledCopyright aria-label="Copyright Information">
        Copyright &copy; {thisYear}
      </StyledCopyright>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  min-height: 20px;
  background-color: var(--palette-main-color, #000);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;
const StyledCopyright = styled.div`
  color: var(--palette-grey-10, #fff);
  font-size: 0.8rem;
  padding-left: 16px;
`;
