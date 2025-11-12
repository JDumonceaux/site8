/* eslint-disable jsx-a11y/prefer-tag-over-role */
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Accordion = ({ children, defaultOpen, title }) => {
  const [isExpanded, setIsExpanded] = useState(Boolean(defaultOpen));

  const handleToggle = () => {
    setIsExpanded((previous) => !previous);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <AccordionDiv>
      <HeaderDiv
        aria-expanded={isExpanded}
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="button"
      >
        <TitleDiv>{title}</TitleDiv>
        <div>
          {isExpanded ? (
            <i className="fa fa-caret-up collapse-icon" />
          ) : (
            <i className="fa fa-caret-down collapse-icon" />
          )}
        </div>
      </HeaderDiv>
      {isExpanded ? <ChildrenDiv>{children}</ChildrenDiv> : null}
    </AccordionDiv>
  );
};

Accordion.propTypes = {
  children: PropTypes.node,
  defaultOpen: PropTypes.bool,
  title: PropTypes.string,
};

export default Accordion;

const TitleDiv = styled.div`
  font-family: abbvoice-bold, Verdana, sans-serif;
  font-size: 16px;
  margin-left: 10px;
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
`;
const ChildrenDiv = styled.div`
  min-height: 20px;
  margin-top: 10px;
`;
