import React from 'react';

import StyledNavLink from 'components/Link/StyledNavLink/StyledNavLink';
import { styled } from 'styled-components';
import type { MenuItem } from 'types';

type ItemRenderProps = {
  readonly children?: React.ReactNode;
  readonly item: MenuItem | undefined;
  readonly level: number;
};

export const ItemRender = ({
  children,
  item,
  level,
}: ItemRenderProps): null | React.JSX.Element => {
  if (!item) {
    return null;
  }

  const renderItem = () => {
    switch (item.type || 'menu') {
      case 'menu': {
        switch (level) {
          case 0: {
            return (
              <StyledMenu0 to={`${item.toComplete}`}>{item.name}</StyledMenu0>
            );
          }
          case 1: {
            return (
              <StyledMenu1 to={`${item.toComplete}`}>{item.name}</StyledMenu1>
            );
          }
          case 2: {
            return (
              <StyledMenu2 to={`${item.toComplete}`}>{item.name}</StyledMenu2>
            );
          }
          default: {
            return null;
          }
        }
      }
      case 'page': {
        switch (level) {
          case 0: {
            return (
              <StyledPage0 to={`${item.toComplete}`}>{item.name}</StyledPage0>
            );
          }
          case 1: {
            return (
              <StyledPage1 to={`${item.toComplete}`}>{item.name}</StyledPage1>
            );
          }
          case 2: {
            return (
              <StyledPage2 to={`${item.toComplete}`}>{item.name}</StyledPage2>
            );
          }
          default: {
            return <div>{item.name}</div>;
          }
        }
      }
      default: {
        return <div>{item.name}</div>;
      }
    }
  };

  return (
    <React.Fragment key={item.id}>
      {renderItem()}
      {children}
    </React.Fragment>
  );
};
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
