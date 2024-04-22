import { Meta } from 'components';

import { APP_NAME } from 'utils/constants';
import { useEffect } from 'react';

export const PrivacyPolicyPage = (): JSX.Element => {
  const title = 'Privacy Policy';

  useEffect(() => {
    document.title = `${APP_NAME} - ${title}`;
  }, []);

  return (
    <>
      <Meta title={title} />
      <div>
        No personally identifiable data is collected this website except in
        conjuction with site security.
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
