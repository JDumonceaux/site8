/* eslint-disable jsx-a11y/prefer-tag-over-role */
import React, { memo, useCallback, useState } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Accordion = ({ children, defaultOpen = false, title }) => {
  const [isExpanded, setIsExpanded] = useState(Boolean(defaultOpen));

  const handleToggle = useCallback(() => {
    setIsExpanded((previous) => !previous);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
    },
    [handleToggle],
  );

  return (
    <AccordionDiv>
      <HeaderDiv
        aria-expanded={isExpanded}
        aria-label={`Toggle ${title || 'accordion'}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <TitleDiv>{title}</TitleDiv>
        <IconDiv>
          {isExpanded ? (
            <i
              aria-hidden="true"
              className="fa fa-caret-up collapse-icon"
            />
          ) : (
            <i
              aria-hidden="true"
              className="fa fa-caret-down collapse-icon"
            />
          )}
        </IconDiv>
      </HeaderDiv>
      {isExpanded && <ChildrenDiv>{children}</ChildrenDiv>}
    </AccordionDiv>
  );
};

Accordion.propTypes = {
  children: PropTypes.node,
  defaultOpen: PropTypes.bool,
  title: PropTypes.string,
};

Accordion.displayName = 'Accordion';

export default memo(Accordion);

const TitleDiv = styled.div`
  font-family: abbvoice-bold, Verdana, sans-serif;
  font-size: 16px;
  margin-left: 10px;
`;

const IconDiv = styled.div`
  display: flex;
  align-items: center;
`;
const AccordionDiv = styled.div`
  background-color: #f5f5f5;
  border-radius: 4px;
  border: 1px solid #d2d2d2;
  padding: 10px;
  margin: 8px 0;
`;
const HeaderDiv = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  align-items: center;
  outline: none;

  &:focus-visible {
    outline: 2px solid #0056b3;
    outline-offset: 2px;
  }
`;
const ChildrenDiv = styled.div`
  min-height: 20px;
  margin-top: 10px;
`;
