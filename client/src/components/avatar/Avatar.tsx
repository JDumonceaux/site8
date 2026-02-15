import type { CSSProperties, JSX } from 'react';

import { UI_DEFAULTS } from '@lib/utils/constants';
import {
  AvatarFallback as RadixAvatarFallback,
  AvatarImage as RadixAvatarImage,
  type AvatarProps as RadixAvatarProps,
  Avatar as RadixAvatarRoot,
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
  /** Testing hook */
  dataTestId?: string;
  /** Seconds before showing fallback (ms) */
  delayMs?: number;
  /** Diameter in pixels */
  size?: number;
  /** Image URL */
  src?: string;
  /** Inline style override */
  style?: CSSProperties;
};

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
  dataTestId,
  delayMs = UI_DEFAULTS.AVATAR_DEFAULT_DELAY,
  size = UI_DEFAULTS.AVATAR_DEFAULT_SIZE,
  src,
  ...rest
}: AvatarProps): JSX.Element | null => {
  const fallbackContent = children ?? getInitials(alt);

  // Basic sanitization: allow only http(s) URLs
  const safeSource = src && /^https?:\/\//.test(src) ? src : undefined;

  // If no image and no fallback content, render nothing
  if (!safeSource && !fallbackContent) return null;

  return (
    <Root
      {...rest}
      data-testid={dataTestId}
      size={size}
    >
      {safeSource ? (
        <Image
          alt={alt ?? 'avatar'}
          src={safeSource}
        />
      ) : null}
      <Fallback delayMs={delayMs}>{fallbackContent}</Fallback>
    </Root>
  );
};

Avatar.displayName = 'Avatar';
export default Avatar;

const Root = styled(RadixAvatarRoot)<{ size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
  border-radius: var(--border-radius-circle);
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
  background-color: var(--color-white);
  color: var(--palette-main-color);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1;
`;
