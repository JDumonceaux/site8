import { type JSX, memo } from 'react';

import AppInitializer from '@features/app/app-initializer/AppInitializer';
import BaseLayout from '@features/layouts/base-layout/BaseLayout';

/**
 * Layout wrapper for the home (root) routes.
 * Provides error boundary, app initialization, and suspense for lazy-loaded routes.
 */
const HomeLayout = (): JSX.Element => (
  <BaseLayout initializer={<AppInitializer />} />
);

HomeLayout.displayName = 'HomeLayout';
export default memo(HomeLayout);
