import * as Avatar from '@radix-ui/react-avatar';
import { memo } from 'react';
import { styled } from 'styled-components';

type AvatarProps = {
  readonly alt?: string;
  readonly children?: React.ReactNode;
  readonly delayMs?: number;
  readonly id?: string;
  readonly src?: string;
} & Avatar.AvatarProps;

const SytledAvatar = ({
  id,
  alt,
  src,
  children,
  delayMs = 600,
}: AvatarProps): JSX.Element => (
  <StyledRoot data-testid={id} id={id}>
    <StyledImage alt={alt} src={src} />
    <StyledFallback delayMs={delayMs}>{children}</StyledFallback>
  </StyledRoot>
);
SytledAvatar.displayName = 'SytledAvatar';

export default memo(SytledAvatar);

const StyledRoot = styled(Avatar.Root)`
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
const StyledImage = styled(Avatar.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;
const StyledFallback = styled(Avatar.AvatarFallback)`
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
