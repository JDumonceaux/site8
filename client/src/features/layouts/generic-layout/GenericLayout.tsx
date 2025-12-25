import { type JSX, memo } from 'react';

import Avatar from '@components/core/avatar/Avatar';
import Header from '@components/core/header/Header';
import AppInitializer from '@features/app/app-initializer/AppInitializer';
import BaseLayout from '@features/layouts/base-layout/BaseLayout';

/**
 * Layout wrapper for general application pages.
 * Provides error boundary, app initialization, header with avatar, and suspense for lazy-loaded routes.
 */
const GenericLayout = (): JSX.Element => (
  <BaseLayout
    header={
      <Header
        avatar={
          <Avatar
            alt="User avatar"
            id="avatar"
            src="/avatar.jpg"
          >
            JD
          </Avatar>
        }
      />
    }
    initializer={<AppInitializer />}
  />
);

GenericLayout.displayName = 'GenericLayout';
export default memo(GenericLayout);
