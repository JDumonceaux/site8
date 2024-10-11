import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Layout from 'components/layouts/Layout/Layout';

import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import { useAxios } from 'hooks/Axios/useAxios';
import { ServiceUrl } from 'lib/utils/constants';
import React, { useDeferredValue, useEffect } from 'react';
import { Photos } from 'types';

const PhotoPage = (): React.JSX.Element => {
  const { data, error, fetchData, isLoading } = useAxios<Photos>();
  const deferredData = useDeferredValue(data);

  useEffect(() => {
    fetchData(`${ServiceUrl.ENDPOINT_PHOTOS}`);
  }, [fetchData]);

  return (
    <>
      <Meta title="Photos" />
      <Layout.Main>
        <PageTitle title="Photos" />
        <Layout.Article>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <ul>
              {deferredData?.items?.map((item) => (
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
                ))}
            </ul>
          </LoadingWrapper>
        </Layout.Article>
      </Layout.Main>
    </>
  );
};

export default PhotoPage;
