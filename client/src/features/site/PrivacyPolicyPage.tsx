import type { JSX } from 'react';

import Meta from '@components/core/Meta/Meta';

/**
 * Privacy Policy page – outlines data collection practices.
 */
const PrivacyPolicyPage = (): JSX.Element => (
  <>
    <Meta title="Privacy Policy" />
    <main aria-labelledby="privacy-policy-heading">
      <h1 id="privacy-policy-heading">Privacy Policy</h1>
      <p>
        No personally identifiable data is collected on this website except in
        conjunction with site security.
      </p>
    </main>
  </>
);

PrivacyPolicyPage.displayName = 'PrivacyPolicyPage';
export default PrivacyPolicyPage;
