import { useDeferredValue, type JSX } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import SubjectMenu from 'features/generic/SubjectMenu';
import Layout from 'features/layouts/Layout/Layout';
import styled from 'styled-components';

import useTiktok from './useTiktok';

export type TikTokPageProps = {
  /** Fallback title if data.name is unavailable */
  readonly title?: string;
};

const TikTokPage = ({
  title = 'TikTok',
}: TikTokPageProps): JSX.Element | null => {
  const tempId = '4000';
  const { data, error, isError, isLoading } = useTiktok(tempId);

  // Defer updates to the title to avoid jank on heavy renders
  const deferredName = useDeferredValue(data?.title);
  const pageTitle = deferredName ?? title;

  return (
    <>
      <Meta title={pageTitle} />
      <Layout.Main>
        <Layout.Menu>
          <SubjectMenu />
        </Layout.Menu>
        <Layout.Article>
          <LoadingWrapper error={error} isError={isError} isLoading={isLoading}>
            <PageTitle title={pageTitle} />
            <StyledSection>
              {data ? (
                <pre>
                  <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
              ) : null}
            </StyledSection>
          </LoadingWrapper>
        </Layout.Article>
        <Layout.Aside>Aside</Layout.Aside>
      </Layout.Main>
    </>
  );
};

TikTokPage.displayName = 'TikTokPage';
export default TikTokPage;

const StyledSection = styled.section`
  pre {
    > code {
      display: block;
      white-space: pre-wrap;
      word-break: break-word;
    }
  }
`;
