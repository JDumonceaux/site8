import React, { useDeferredValue } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'components/layouts/Layout/Layout';

import usePhotos from './usePhotos';

const PhotoPage = (): React.JSX.Element => {
  const { data, isError, isPending } = usePhotos();

  const deferredData = useDeferredValue(data);

  return (
    <>
      <Meta title="Photos" />
      <Layout.Main>
        <PageTitle title="Photos" />
        <Layout.Article>
          <LoadingWrapper isError={isError} isPending={isPending}>
            <ul>
              {deferredData?.items.map((item) => (
                <li key={item.id}>
                  <a
                    data-caption={item.description}
                    data-fancybox
                    href={item.url}>
                    <img alt={item.description} loading="lazy" src={item.url} />
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
