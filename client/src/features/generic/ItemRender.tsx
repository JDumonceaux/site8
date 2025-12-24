import React, { type JSX } from 'react';

import StyledNavLink from '@components/link/styled-nav-link/StyledNavLink';
import type { MenuItem } from '../../types/MenuItem';
import styled from 'styled-components';

type ItemRenderProps = {
  readonly children?: React.ReactNode;
  readonly item: MenuItem;
  readonly level: number;
};

const ItemRender = ({
  children,
  item,
  level,
}: ItemRenderProps): JSX.Element | null => {
  let content: React.ReactNode;

  if (item.type === 'menu') {
    const menuComponents: Record<number, typeof StyledNavLink> = {
      0: StyledMenu0,
      1: StyledMenu1,
      2: StyledMenu2,
    };

    const Component = menuComponents[level];
    content = item.url ? (
      <Component to={item.url}>{item.title}</Component>
    ) : (
      <div>{item.title}</div>
    );
  } else if (item.type === 'page') {
    const pageComponents: Record<number, typeof StyledNavLink> = {
      0: StyledPage0,
      1: StyledPage1,
      2: StyledPage2,
    };

    const Component = pageComponents[level];
    content = item.url ? (
      <Component to={item.url}>{item.title}</Component>
    ) : (
      <div>{item.title}</div>
    );
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
  padding-left: 20px;
`;
const StyledMenu2 = styled(StyledMenuLink)`
  padding-left: 30px;
`;

const StyledPage0 = styled(StyledMenuLink)`
  padding-left: 20px;
`;
const StyledPage1 = styled(StyledMenuLink)`
  padding-left: 20px;
`;
const StyledPage2 = styled(StyledMenuLink)`
  padding-left: 30px;
`;
