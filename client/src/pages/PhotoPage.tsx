import { LoadingWrapper } from 'components/common/Loading';
import { PageTitle } from 'components/common/PageTitle';
import { Meta } from 'components/common/Meta';

import { useDeferredValue } from 'react';

import StyledMain from 'components/common/StyledMain';
import { useAxios } from 'hooks/Axios';
import { ServiceUrl } from 'utils';
import { Photos } from 'services/types';

const PhotoPage = (): JSX.Element => {
  const { data, isLoading, error } = useAxios<Photos>(
    `${ServiceUrl.ENDPOINT_PHOTOS}`,
  );
  const deferredData = useDeferredValue(data);

  return (
    <>
      <Meta title="Photos" />
      <StyledMain>
        <PageTitle title="Photos" />
        <StyledMain.Article>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <ul>
              {deferredData?.items?.map((item) => {
                return (
                  <li key={item.id}>
                    <a
                      data-caption={item.description}
                      data-fancybox
                      href={item.url}>
                      <img
                        alt={item.description}
                        loading="lazy"
                        src={item.url}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </LoadingWrapper>
        </StyledMain.Article>
      </StyledMain>
    </>
  );
};

export default PhotoPage;
