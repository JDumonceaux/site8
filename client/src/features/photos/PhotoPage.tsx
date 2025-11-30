import { type JSX, useDeferredValue } from 'react';

import LoadingWrapper from '@components/core/loading/LoadingWrapper';
import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import Layout from '@features/layouts/layout/Layout';
import { sanitizeUrl } from '@lib/utils/helpers';
import usePhotos from './usePhotos';

/**
 * Photo page – displays a gallery of photos with lazy loading.
 */
const PhotoPage = (): JSX.Element | null => {
  const { data = { items: [] }, error, isError, isLoading } = usePhotos();
  const deferredData = useDeferredValue(data);
  const { items } = deferredData;

  return (
    <>
      <Meta title="Photos" />
      <Layout.Main>
        <PageTitle title="Photos" />
        <Layout.Article>
          <LoadingWrapper
            error={error}
            isError={isError}
            isLoading={isLoading}
          >
            <ul>
              {items.map(({ description, id, url }) => {
                const safeUrl = sanitizeUrl(url);
                return (
                  <li key={id}>
                    <a
                      href={safeUrl}
                      data-caption={description}
                      data-fancybox
                    >
                      <img
                        alt={description}
                        src={safeUrl}
                        loading="lazy"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </LoadingWrapper>
        </Layout.Article>
      </Layout.Main>
    </>
  );
};

PhotoPage.displayName = 'PhotoPage';
export default PhotoPage;
