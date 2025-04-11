import React, { useDeferredValue } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'features/layouts/Layout/Layout';
import { sanitizeUrl } from 'lib/utils/helpers';

import usePhotos from './usePhotos';

const PhotoPage = (): React.JSX.Element => {
  const { data, error, isError, isLoading } = usePhotos();

  const deferredData = useDeferredValue(data);

  return (
    <>
      <Meta title="Photos" />
      <Layout.Main>
        <PageTitle title="Photos" />
        <Layout.Article>
          <LoadingWrapper error={error} isError={isError} isLoading={isLoading}>
            <ul>
              {deferredData?.items.map((item) => (
                <li key={item.id}>
                  <a
                    data-caption={item.description}
                    data-fancybox
                    href={sanitizeUrl(item.url)}>
                    <img
                      alt={item.description}
                      loading="lazy"
                      src={sanitizeUrl(item.url)}
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
