import { type JSX } from 'react';

import AppInitializer from '@features/app/app-initializer/AppInitializer';
import BaseLayout from '@features/layouts/base-layout/BaseLayout';

/**
 * Layout wrapper for photo-related routes.
 */
const PhotoLayout = (): JSX.Element => (
  <BaseLayout initializer={<AppInitializer />} />
);

PhotoLayout.displayName = 'PhotoLayout';
export default PhotoLayout;
