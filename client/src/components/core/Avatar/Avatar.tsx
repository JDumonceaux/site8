import { memo, type JSX, type CSSProperties } from 'react';

import {
  Avatar as RadixAvatarRoot,
  AvatarImage as RadixAvatarImage,
  AvatarFallback as RadixAvatarFallback,
  type AvatarProps as RadixAvatarProps,
} from '@radix-ui/react-avatar';

import styled from 'styled-components';

/**
 * Props for our Avatar:
 * - Omit Radix’s own `delayMs` so we can supply a default
 * - Allow specifying a distinct `dataTestId`
 */
export type AvatarProps = Omit<RadixAvatarProps, 'delayMs'> & {
  /** Fallback text (e.g. initials) if no `children` provided */
  alt?: string;
  /** Seconds before showing fallback (ms) */
  delayMs?: number;
  /** Diameter in pixels */
  size?: number;
  /** Image URL */
  src?: string;
  /** Testing hook */
  dataTestId?: string;
  /** Inline style override */
  style?: CSSProperties;
};

const DEFAULT_SIZE = 40;
const DEFAULT_DELAY = 600;

const getInitials = (name?: string): string =>
  name
    ?.trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase() ?? '';

/**
 * A circular avatar that shows an <img> when `src` is valid,
 * otherwise renders initials or custom `children`.
 */
const Avatar = ({
  alt,
  children,
  delayMs = DEFAULT_DELAY,
  size = DEFAULT_SIZE,
  src,
  dataTestId,
  style,
  ...rest
}: AvatarProps): JSX.Element | null => {
  const fallbackContent = children ?? getInitials(alt);

  // Basic sanitization: allow only http(s) URLs
  const safeSrc = src && /^https?:\/\//.test(src) ? src : undefined;

  // If no image and no fallback content, render nothing
  if (!safeSrc && !fallbackContent) return null;

  return (
    <Root {...rest} size={size} style={style} data-testid={dataTestId}>
      {safeSrc && <Image src={safeSrc} alt={alt ?? 'avatar'} />}
      <Fallback delayMs={delayMs}>{fallbackContent}</Fallback>
    </Root>
  );
};

Avatar.displayName = 'Avatar';
export default memo(Avatar);

const Root = styled(RadixAvatarRoot)<{ size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
  border-radius: 50%;
  background-color: var(--black-a3);
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const Image = styled(RadixAvatarImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

const Fallback = styled(RadixAvatarFallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: var(--violet-11);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
`;
