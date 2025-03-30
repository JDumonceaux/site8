import { Suspense, useDeferredValue } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'features/layouts/Layout/Layout';
import SubjectMenu from 'features/generic/SubjectMenu';
import { getSRC } from 'lib/utils/helpers';
import styled from 'styled-components';
import type { Image } from 'types/Image';

import useImages from './useImages';

const GenericImagePage = (): React.JSX.Element => {
  const { data, isError, isPending } = useImages();

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
          <LoadingWrapper isError={isError} isPending={isPending}>
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
                    <div>
                      <a href={`${item.official_url}`}>Offical Site</a>
                    </div>
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
