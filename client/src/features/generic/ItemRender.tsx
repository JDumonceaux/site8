import React, { type JSX } from 'react';

import StyledNavLink from '@components/ui/link/styled-nav-link/StyledNavLink';
import type { MenuItem } from '../../types/MenuItem';
import styled from 'styled-components';

type ItemRenderProps = {
  readonly children?: React.ReactNode;
  readonly hasChildren?: boolean;
  readonly isExpanded?: boolean;
  readonly item: MenuItem;
  readonly level: number;
  readonly onToggle?: () => void;
};

const ItemRender = ({
  children,
  hasChildren = false,
  isExpanded = false,
  item,
  level,
  onToggle,
}: ItemRenderProps): JSX.Element | null => {
  let content: React.ReactNode;

  if (item.type === 'menu') {
    const menuComponents: Record<
      number,
      React.ComponentType<{
        readonly children: React.ReactNode;
        readonly to: string;
      }>
    > = {
      0: StyledMenu0,
      1: StyledMenu1,
      2: StyledMenu2,
    };

    const Component = menuComponents[level];

    // If has children, make it clickable to expand/collapse
    if (hasChildren && onToggle) {
      content = (
        <StyledMenuButton
          onClick={onToggle}
          level={level}
        >
          <span>{item.title}</span>
          <StyledIcon>{isExpanded ? '▼' : '▶'}</StyledIcon>
        </StyledMenuButton>
      );
    } else if (item.url) {
      content = <Component to={item.url}>{item.title}</Component>;
    } else {
      content = <div>{item.title}</div>;
    }
  } else if (item.type === 'page') {
    const pageComponents: Record<
      number,
      React.ComponentType<{
        readonly children: React.ReactNode;
        readonly to: string;
      }>
    > = {
      0: StyledPage0,
      1: StyledPage1,
      2: StyledPage2,
    };

    const Component = pageComponents[level];

    // If has children, make it clickable to expand/collapse
    if (hasChildren && onToggle) {
      content = (
        <StyledMenuButton
          onClick={onToggle}
          level={level}
        >
          <span>{item.title}</span>
          <StyledIcon>{isExpanded ? '▼' : '▶'}</StyledIcon>
        </StyledMenuButton>
      );
    } else if (item.url) {
      content = <Component to={item.url}>{item.title}</Component>;
    } else {
      content = <div>{item.title}</div>;
    }
  } else {
    content = <div>{item.title}</div>;
  }

  return (
    <React.Fragment key={item.id}>
      {content}
      {children}
    </React.Fragment>
  );
};

ItemRender.displayName = 'ItemRender';

export default ItemRender;

const StyledMenuLink = styled(StyledNavLink)`
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: var(--palette-dark-text);
  }
  display: inline-block;
  width: 100%;
  padding: 12px;
  margin-bottom: 4px;
  // &.active {
  //   background: var(--navbar-dark-secondary);
  // }
`;
const StyledMenu0 = styled(StyledMenuLink)`
  padding: 12px;
  &.active {
    background: var(--navbar-dark-secondary);
  }
`;
const StyledMenu1 = styled(StyledMenuLink)`
  padding-inline-start: 20px;
`;
const StyledMenu2 = styled(StyledMenuLink)`
  padding-inline-start: 30px;
`;

const StyledPage0 = styled(StyledMenuLink)`
  padding-inline-start: 20px;
`;
const StyledPage1 = styled(StyledMenuLink)`
  padding-inline-start: 20px;
`;
const StyledPage2 = styled(StyledMenuLink)`
  padding-inline-start: 30px;
`;

const StyledMenuButton = styled.button<{ level: number }>`
  background: none;
  border: none;
  color: var(--palette-dark-text);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${({ level }) => {
    if (level === 0) return '12px';
    if (level === 1) return '12px 12px 12px 20px';
    return '12px 12px 12px 30px';
  }};
  margin-bottom: 4px;
  text-align: left;
  font-size: inherit;
  font-family: inherit;

  &:hover {
    background: var(--navbar-dark-secondary);
  }

  &:focus {
    outline: 2px solid var(--palette-primary);
    outline-offset: -2px;
  }
`;

const StyledIcon = styled.span`
  font-size: 0.75em;
  margin-left: 8px;
  transition: transform 0.2s;
`;
