'use client';
import { styled } from 'styled-components';
import { Suspense, useDeferredValue } from 'react';

import { LoadingWrapper, Meta, PageTitle } from 'components';
import StyledMain from 'components/common/StyledMain/StyledMain';
import SubjectMenu from 'components/common/Menu/SubjectMenu';
import { useQuery, gql } from '@apollo/client';

const IMAGE_QUERY = gql`
  {
    images {
      file
      description
    }
  }
`;

export type Images = {
  readonly images: {
    readonly file: string;
    readonly description: string;
  }[];
};

export type Image = {
  readonly file: string;
  readonly description: string;
};

const GenericImagePage = (): JSX.Element => {
  // const routeParams = useParams<{
  //   id: string;
  // }>();

  //const tempId = routeParams.id;

  const { data, loading, error } = useQuery(IMAGE_QUERY);

  console.log('data', data);

  const deferredData = useDeferredValue<Image[]>(
    data?.images ? data.images : undefined,
  );

  const pageTitle = 'Images';
  const imagePath = '/images/like/';

  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <Meta title={pageTitle} />
      <StyledMain>
        <StyledMain.Menu>
          <SubjectMenu />
        </StyledMain.Menu>
        <StyledMain.Article>
          <LoadingWrapper error={error} isLoading={loading}>
            <PageTitle title={pageTitle} />
            <StyledMain.Section>
              <Suspense fallback="Loading results ...">
                {deferredData?.map((item, index) => (
                  <div key={index}>
                    <StyledImage
                      alt={item.description}
                      src={`${imagePath}${item.file}`}
                    />
                    <div>{item.description}</div>
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
