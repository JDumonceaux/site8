import { type JSX, memo } from 'react';

import Header from '@components/core/header/Header';
import BaseLayout from '@features/layouts/base-layout/BaseLayout';

/**
 * Layout wrapper for authentication-related routes.
 * Provides error boundary and suspense for lazy-loaded routes.
 */
const AuthLayout = (): JSX.Element => <BaseLayout header={<Header />} />;

AuthLayout.displayName = 'AuthLayout';
export default memo(AuthLayout);
