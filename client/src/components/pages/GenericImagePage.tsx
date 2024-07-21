import LoadingWrapper from 'components/common/Loading/LoadingWrapper';
import Meta from 'components/common/Meta/Meta';
import PageTitle from 'components/common/PageTitle/PageTitle';
import StyledMain from 'components/common/StyledMain/StyledMain';
import SubjectMenu from 'components/ui/GenericPage/SubjectMenu';
import { useAxios } from 'hooks/Axios';
import { Suspense, useDeferredValue, useEffect } from 'react';
import { styled } from 'styled-components';
import { Image } from 'types/Image';
import { Images } from 'types/Images';
import { ServiceUrl } from 'utils';
import { getSRC } from 'utils/helpers';

const GenericImagePage = (): JSX.Element => {
  const { data, isLoading, error, fetchData } = useAxios<Images>();

  const deferredData = useDeferredValue<Image[]>(data ? data.items : []);

  useEffect(() => {
    fetchData(`${ServiceUrl.ENDPOINT_IMAGES}`);
  }, [fetchData]);

  const pageTitle = 'Images';

  if (error) return <pre>{error}</pre>;

  console.log('deferredData:', deferredData);

  return (
    <>
      <Meta title={pageTitle} />
      <StyledMain>
        <StyledMain.Menu>
          <SubjectMenu />
        </StyledMain.Menu>
        <StyledMain.Article>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <PageTitle title={pageTitle} />
            <StyledMain.Section>
              <Suspense fallback="Loading results ...">
                {deferredData?.map((item, index) => (
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
            </StyledMain.Section>
          </LoadingWrapper>
        </StyledMain.Article>
        <StyledMain.Aside />
      </StyledMain>
    </>
  );
};

export default GenericImagePage;

const StyledImage = styled.img`
  height: 200px;
  width: 200px;
`;
