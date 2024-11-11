import { memo } from 'react';

import * as RadixAvatar from '@radix-ui/react-avatar';
import { styled } from 'styled-components';

type AvatarProps = {
  readonly alt?: string;
  readonly children?: React.ReactNode;
  readonly delayMs?: number;
  readonly id?: string;
  readonly src?: string;
} & RadixAvatar.AvatarProps;

const SytledAvatar = ({
  alt,
  children,
  delayMs = 600,
  id,
  src,
  ...rest
}: AvatarProps): React.JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <StyledRoot data-testid={id} id={id} {...rest}>
    <StyledImage alt={alt} src={src} />
    <StyledFallback delayMs={delayMs}>{children}</StyledFallback>
  </StyledRoot>
);
SytledAvatar.displayName = 'SytledAvatar';

export default memo(SytledAvatar);

const StyledRoot = styled(RadixAvatar.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-color: var(--black-a3);
  margin: 5px;
`;
const StyledImage = styled(RadixAvatar.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;
const StyledFallback = styled(RadixAvatar.AvatarFallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: var(--violet-11);
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
`;
