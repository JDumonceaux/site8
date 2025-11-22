import Tooltip from 'empower-components/Tooltip';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { handleColorType } from '../../StyleColorType';

const IconsMenuItem = ({ includeLI = false, item }) => {
  if (!item || !item.show) {
    return null;
  }

  const showText = item.showText ? <span>{item.text}</span> : null;
  const itemContent = (
    <>
      {item.icon}
      {showText}
    </>
  );

  // Priority: to > link > onClick
  let clickContent = null;
  if (item.to) {
    clickContent = <Link to={item.to}>{itemContent}</Link>;
  } else if (item.link) {
    clickContent = <a href={item.link}>{itemContent}</a>;
  } else if (item.onClick) {
    clickContent = (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          item.onClick(e);
        }}
      >
        {itemContent}
      </a>
    );
  }

  const content = (
    <StyledItem
      $align={item.align}
      $isEnabled={item.isEnabled}
      $status={item.status}
    >
      {item.showToolTip !== false && item.toolTip ? (
        item.isEnabled ? (
          <Tooltip title={item.toolTip}>{clickContent}</Tooltip>
        ) : (
          <Tooltip title={item.toolTipDisabled}>{itemContent}</Tooltip>
        )
      ) : item.isEnabled ? (
        <div>{clickContent}</div>
      ) : (
        <div>{itemContent}</div>
      )}
      {item.children}
      {item.count > 0 ? <Badge $status="info">{item.count}</Badge> : null}
      {item.badge ? (
        <Badge $status={item.badgeStatus}>{item.badge}</Badge>
      ) : null}
    </StyledItem>
  );

  return includeLI ? (
    <StyledLi>{content}</StyledLi>
  ) : (
    <StyledDiv>{content}</StyledDiv>
  );
};

IconsMenuItem.propTypes = {
  includeLI: PropTypes.bool,
  item: PropTypes.shape({
    align: PropTypes.string,
    badge: PropTypes.node,
    badgeStatus: PropTypes.string,
    children: PropTypes.node,
    count: PropTypes.number,
    icon: PropTypes.node,
    iconActive: PropTypes.node,
    isActive: PropTypes.bool,
    isEnabled: PropTypes.bool,
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    link: PropTypes.string,
    onClick: PropTypes.func,
    show: PropTypes.bool,
    showText: PropTypes.bool,
    showToolTip: PropTypes.bool,
    status: PropTypes.number,
    text: PropTypes.string,
    to: PropTypes.string,
    toolTip: PropTypes.string,
    toolTipDisabled: PropTypes.string,
    type: PropTypes.string,
  }),
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
  div:first-child {
    display: block;
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
