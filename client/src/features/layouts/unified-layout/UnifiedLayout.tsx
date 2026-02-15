import { type JSX, memo, useMemo } from 'react';

import Avatar from '@components/avatar/Avatar';
import Header from '@components/header/Header';
import AppInitializer from '@app/app-initializer/AppInitializer';
import BaseLayout from '@features/layouts/base-layout/BaseLayout';

type UnifiedLayoutProps = {
  /** Whether to display the avatar in the header */
  readonly hasAvatar?: boolean;
  /** Whether to display the header */
  readonly hasHeader?: boolean;
  /** Whether to include the app initializer */
  readonly hasInitializer?: boolean;
};

/**
 * Unified layout component that consolidates all layout variants.
 * Provides flexible configuration for header, avatar, and initializer.
 *
 * @example
 * // Home/Photo layout (with initializer only)
 * <UnifiedLayout hasInitializer />
 *
 * @example
 * // Auth layout (with header only)
 * <UnifiedLayout hasHeader />
 *
 * @example
 * // Generic layout (with all features)
 * <UnifiedLayout hasInitializer hasHeader hasAvatar />
 */
const UnifiedLayout = ({
  hasAvatar = false,
  hasHeader = false,
  hasInitializer = false,
}: UnifiedLayoutProps): JSX.Element => {
  const avatarElement = useMemo(
    () => (
      <Avatar
        alt="User avatar"
        id="avatar"
        src="/avatar.jpg"
      >
        JD
      </Avatar>
    ),
    [],
  );

  const appInitializerElement = useMemo(() => <AppInitializer />, []);

  const headerElement = useMemo(
    () =>
      hasHeader ? (
        <Header avatar={hasAvatar ? avatarElement : undefined} />
      ) : undefined,
    [hasAvatar, hasHeader, avatarElement],
  );

  const initializerElement = useMemo(
    () => (hasInitializer ? appInitializerElement : undefined),
    [hasInitializer, appInitializerElement],
  );

  return (
    <BaseLayout
      header={headerElement}
      initializer={initializerElement}
    />
  );
};

UnifiedLayout.displayName = 'UnifiedLayout';
export default memo(UnifiedLayout);
