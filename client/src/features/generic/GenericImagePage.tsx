import { type JSX, Suspense, useDeferredValue } from 'react';

import SubjectMenu from '@features/generic/SubjectMenu';
import Layout from '@features/layouts/Layout/Layout';
import { getSRC, sanitizeUrl } from '@lib/utils/helpers';
import styled from 'styled-components';
import LoadingWrapper from '@/components/core/loading/LoadingWrapper';
import Meta from '@/components/core/meta/Meta';
import PageTitle from '@/components/core/page-title/PageTitle';
import type { Image } from '../../types/Image';
import useImages from '../images-edit/useImages';

const GenericImagePage = (): JSX.Element => {
  const { data, isError, isLoading } = useImages();

  const deferredData = useDeferredValue<Image[]>(data?.items ?? []);

  const pageTitle = 'Images';

  return (
    <>
      <Meta title={pageTitle} />
      <Layout.Main>
        <Layout.Menu>
          <SubjectMenu />
        </Layout.Menu>
        <Layout.Article>
          <LoadingWrapper
            isError={isError}
            isLoading={isLoading}
          >
            <PageTitle title={pageTitle} />
            <Layout.Section>
              <Suspense fallback="Loading results ...">
                {deferredData.map((item) => (
                  <div key={item.id}>
                    <StyledImage
                      alt={item.fileName}
                      src={getSRC(item.folder, item.fileName)}
                    />
                    <div>{item.fileName}</div>
                    {item.official_url ? (
                      <div>
                        <a href={sanitizeUrl(item.official_url)}>
                          Offical Site
                        </a>
                      </div>
                    ) : null}
                    {/* <div>{item.tags}</div>  */}
                  </div>
                ))}
              </Suspense>
            </Layout.Section>
          </LoadingWrapper>
        </Layout.Article>
        <Layout.Aside />
      </Layout.Main>
    </>
  );
};

export default GenericImagePage;

const StyledImage = styled.img`
  height: 200px;
  width: 200px;
`;
