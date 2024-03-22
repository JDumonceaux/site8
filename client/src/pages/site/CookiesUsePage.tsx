import { Meta } from 'components/common/Meta';

import { APP_NAME } from 'utils/constants';
import { useEffect } from 'react';

export const CookiesUsePage = (): JSX.Element => {
  const title = 'Cookies Use';

  useEffect(() => {
    document.title = `${APP_NAME} - ${title}`;
  }, []);

  return (
    <>
      <Meta title={title} />
      <div>No cookies were used or injured in the making of this website.</div>
      <div>Validate by Betty Crocker</div>
    </>
  );
};

export default CookiesUsePage;
