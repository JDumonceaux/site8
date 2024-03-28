import { styled } from 'styled-components';

import { useLayoutEffect, useState } from 'react';
import { useMatches } from 'react-router-dom';

type AccordionMenuProps = {
  readonly id: number;
  readonly title: string;
  readonly path?: string;
  readonly children: React.ReactNode;
};

export const AccordionMenu = ({
  id,
  title,
  path = '',
  children,
}: AccordionMenuProps): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);
  // Only works with data routers.
  const matches = useMatches();

  // useLayoutEffect blocks the browser from repainting
  useLayoutEffect(() => {
    const isMatch = matches.some((match) => match.pathname === path);
    setExpanded(isMatch);
  }, [matches, path]);

  const toggleSection = () => {
    setExpanded((prev) => !prev);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleSection();
    }
  };

  return (
    <StyledWrapper>
      <StyledSection key={id}>
        <StyledButton
          aria-controls={`accordion-content-${id}`}
          aria-expanded={expanded}
          onClick={() => toggleSection()}
          onKeyDown={(e) => handleKeyPress(e)}
          type="button">
          <StyledTitle>{title}</StyledTitle>
          <StyledSvg
            $isExpanded={expanded}
            fill="currentColor"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10l5 5 5-5z" />
          </StyledSvg>
        </StyledButton>
        {expanded ? (
          <StyledItem id={`accordion-content-${id}`}>{children}</StyledItem>
        ) : null}
      </StyledSection>
    </StyledWrapper>
  );
};

const StyledSvg = styled.svg<{ $isExpanded: boolean }>`
  transition: transform 0.2s ease-in-out;
  ${(props) => props.$isExpanded && 'transform: rotate(180deg);'};
`;
const StyledWrapper = styled.div`
  width: 300px;
  background-color: #4a4747;
`;
const StyledSection = styled.div`
  margin-bottom: 2px;
`;
const StyledTitle = styled.span`
  display: inline-block;
  margin-right: 8px;
`;
const StyledButton = styled.button`
  background-color: #f0f0f0;
  font-weight: 500;
  width: 100%;
  letter-spacing: 0.25px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow:
    0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;
const StyledItem = styled.div`
  padding: 8px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  a {
    display: block;
    color: var(--palette-black, #000);
    border-bottom: 1px solid var(--palette-grey-dark);
    display: block;
    text-decoration: none;
    padding: 6px 12px 6px 32px;
  }
  a:visited,
  a:focus {
    color: var(--palette-black, #000);
  }
`;
