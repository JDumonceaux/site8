import React from 'react';
import { Link } from 'react-router-dom';

import Tooltip from 'empower-components/Tooltip';
import styled from 'styled-components';
import { handleColorType } from '../../StyleColorType';

const IconsMenuItem = ({ includeLI = false, item }) => {
  if (!item || !item.show) {
    return null;
  }

  const showText = item.showText ? <span>{item.text}</span> : null;

  const activeContent = (
    <StyledItem
      $align={item.align}
      $isEnabled={item.isEnabled}
      $status={item.status}
    >
      {item.isEnabled ? (
        <>
          <Tooltip title={item.toolTip}>
            {item.onClick ? (
              <a onClick={item.onClick}>
                {item.icon}
                {showText}
              </a>
            ) : null}
            {item.link ? (
              <a href={item.link}>
                {item.icon}
                {showText}
              </a>
            ) : null}
            {item.to ? (
              <Link to={item.to}>
                {item.icon}
                {showText}
              </Link>
            ) : null}
          </Tooltip>
          {item.children}
        </>
      ) : (
        <Tooltip title={item.toolTip}>
          <>
            {item.icon}
            {showText}
          </>
        </Tooltip>
      )}
      {item.count > 0 ? <Badge $status="info">{item.count}</Badge> : null}
      {item.badge ? (
        <Badge $status={item.badgeStatus}>{item.badge}</Badge>
      ) : null}
    </StyledItem>
  );

  return includeLI ? (
    <StyledLi>{activeContent}</StyledLi>
  ) : (
    <StyledDiv>{activeContent}</StyledDiv>
  );
};

IconsMenuItem.displayName = 'IconsMenuItem';
export default IconsMenuItem;

const StyledItem = styled.div`
  align-items: ${(props) =>
    props.$align === 'start' ? 'flex-start' : 'center'};
  text-align: ${(props) => (props.$align === 'start' ? 'inherit' : 'center')};
  color: ${(props) =>
    props.$isEnabled === false
      ? handleColorType('disabled')
      : handleColorType(props.$status)};
  i {
    font-size: 20px;
    width: 30px;
    margin-left: 3px;
  }
  & .fa-stack-1x {
    top: 4px;
  }
  i.stacked-icon {
    font-size: 10px;
    margin-top: 2px;
    margin-left: 5px;
  }
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
`;
const StyledDiv = styled.div`
  display: inline;
  position: relative;
`;
const StyledLi = styled.li`
  display: list-item;
  position: relative;
`;
const Badge = styled.span`
  background-color: ${(props) => handleColorType(props.$status)};
  border-radius: 50%;
  color: white;
  font-size: 9px;
  height: 16px;
  line-height: 16px;
  position: absolute;
  right: -3px;
  text-align: center;
  top: -5px;
  width: 16px;
`;
