import { Suspense, useDeferredValue, useEffect } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'components/layouts/Layout/Layout';
import SubjectMenu from 'features/generic/SubjectMenu';
import { useAxios } from 'hooks/Axios/useAxios';
import { ServiceUrl } from 'lib/utils/constants';
import { getSRC } from 'lib/utils/helpers';
import { styled } from 'styled-components';
import type { Image } from 'types/Image';
import type { Images } from 'types/Images';

const GenericImagePage = (): React.JSX.Element => {
  const { data, error, fetchData, isLoading } = useAxios<Images>();

  const deferredData = useDeferredValue<Image[]>(data ? data.items : []);

  useEffect(() => {
    fetchData(ServiceUrl.ENDPOINT_IMAGES);
  }, [fetchData]);

  const pageTitle = 'Images';

  if (error) return <pre>{error}</pre>;

  return (
    <>
      <Meta title={pageTitle} />
      <Layout.Main>
        <Layout.Menu>
          <SubjectMenu />
        </Layout.Menu>
        <Layout.Article>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <PageTitle title={pageTitle} />
            <Layout.Section>
              <Suspense fallback="Loading results ...">
                {deferredData.map((item, index) => (
                  <div key={index}>
                    <StyledImage
                      alt={item.name}
                      src={getSRC(item.folder, item.fileName)}
                    />
                    <div>{item.name}</div>
                    <div>
                      <a href={`${item.name}`}>Offical Site</a>
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
