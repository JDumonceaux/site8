import { Fragment, type JSX, type ReactNode, useCallback } from 'react';

import StyledNavLink from '@components/link/styled-nav-link/StyledNavLink';
import type { MenuItem } from '@site8/shared';
import styled from 'styled-components';

type ItemRenderProps = {
  readonly children?: ReactNode;
  readonly hasChildren?: boolean;
  readonly isExpanded?: boolean;
  readonly item: MenuItem;
  readonly level: number;
  readonly onToggle?: (item: MenuItem) => void;
};

const StyledItem = ({
  level,
  to,
  type,
  ...props
}: {
  [key: string]: any;
  level: number;
  to: string;
  type: 'menu' | 'page';
}) => {
  if (type === 'menu') {
    switch (level) {
      case 0: {
        return (
          <StyledMenu0
            to={to}
            {...props}
          />
        );
      }
      case 1: {
        return (
          <StyledMenu1
            to={to}
            {...props}
          />
        );
      }
      case 2: {
        return (
          <StyledMenu2
            to={to}
            {...props}
          />
        );
      }
      default: {
        return (
          <StyledMenu2
            to={to}
            {...props}
          />
        );
      }
    }
  }
  switch (level) {
    case 0: {
      return (
        <StyledPage0
          to={to}
          {...props}
        />
      );
    }
    case 1: {
      return (
        <StyledPage1
          to={to}
          {...props}
        />
      );
    }
    case 2: {
      return (
        <StyledPage2
          to={to}
          {...props}
        />
      );
    }
    default: {
      return (
        <StyledPage2
          to={to}
          {...props}
        />
      );
    }
  }
};

const ItemRender = ({
  children,
  hasChildren = false,
  isExpanded = false,
  item,
  level,
  onToggle,
}: ItemRenderProps): JSX.Element | null => {
  const handleToggle = useCallback(() => {
    if (onToggle != null) {
      onToggle(item);
    }
  }, [item, onToggle]);

  let content: React.ReactNode;

  if (item.type === 'menu' || item.type === 'page') {
    // If has children, make it clickable to expand/collapse
    if (hasChildren && onToggle != null) {
      content = (
        <StyledMenuButton
          level={level}
          onClick={handleToggle}
        >
          <span>{item.title}</span>
          <StyledIcon>{isExpanded ? '▼' : '▶'}</StyledIcon>
        </StyledMenuButton>
      );
    } else if (item.url != null && item.url !== '') {
      content = (
        <StyledItem
          level={level}
          to={item.url}
          type={item.type}
        >
          {item.title}
        </StyledItem>
      );
    } else {
      content = <div>{item.title}</div>;
    }
  } else {
    content = <div>{item.title}</div>;
  }

  return (
    <Fragment key={item.id}>
      {content}
      {children}
    </Fragment>
  );
};

ItemRender.displayName = 'ItemRender';

export default ItemRender;

const StyledMenuLink = styled(StyledNavLink)`
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: var(--navbar-text);
  }
  display: inline-block;
  width: 100%;
  padding: 12px;
  margin-bottom: 4px;
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
  color: var(--navbar-text);
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
