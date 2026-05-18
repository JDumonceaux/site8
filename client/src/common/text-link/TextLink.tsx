import type { JSX, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

type FontSize = 'lg' | 'md' | 'sm';

const FONT_SIZES: Record<FontSize, string> = {
  lg: '16px',
  md: '14px',
  sm: '12px',
};

export type TextLinkProps = {
  readonly className?: string;
  readonly href?: string;
  readonly icon?: string;
  readonly isDisabled?: boolean;
  readonly onClick?: MouseEventHandler;
  readonly size?: FontSize;
  readonly target?: string;
  readonly text: string;
  readonly to?: string;
  readonly tooltip?: string;
};

const TextLink = ({
  className,
  href,
  icon,
  isDisabled = false,
  onClick,
  size,
  target,
  text,
  to,
  tooltip,
}: TextLinkProps): JSX.Element => {
  let as: React.ElementType = 'a';
  const extraProps: Record<string, string> = {};

  if (to) {
    as = Link;
    extraProps.to = to;
  } else if (href) {
    extraProps.href = href;
    if (target) {
      extraProps.target = target;
      if (target === '_blank') {
        extraProps.rel = 'noopener noreferrer';
      }
    }
  } else {
    as = 'span';
    extraProps.role = 'button';
  }

  return (
    <Anchor
      $isDisabled={isDisabled}
      $size={size}
      as={as}
      className={className}
      onClick={isDisabled ? undefined : onClick}
      title={tooltip}
      {...extraProps}
    >
      {icon ? <i className={icon} /> : null}
      {text}
    </Anchor>
  );
};

export default TextLink;

const Anchor = styled.a<{ $isDisabled: boolean; $size?: FontSize }>`
  display: inline-flex;
  align-items: center;
  color: ${({ $isDisabled }) =>
    $isDisabled ? 'var(--text-primary-muted-color)' : 'var(--link-color)'};
  font-size: ${({ $size }) => ($size ? FONT_SIZES[$size] : 'inherit')};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  text-decoration: none;
  position: relative;
  > i {
    margin-right: 8px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.4s ease;
  }

  ${({ $isDisabled }) =>
    !$isDisabled &&
    `
    &:hover {
      color: var(--link-hover);
      text-decoration: none;
    }
    &:hover::after {
      transform: scaleX(1);
    }
  `}
`;
