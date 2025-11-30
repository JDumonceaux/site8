import { type JSX, Suspense } from 'react';

import LoadingWrapper from '@components/core/loading/LoadingWrapper';
import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import useArtistsItems from '@features/items-add/useArtistsItems';
import Layout from '@features/layouts/layout/Layout';
import ImageDetail from './ImageDetail';
import MenuBar from './MenuBar';
import RightMenu from './RightMenu';
import useImagesEditPage from './useImagesEditPage';
import styled from 'styled-components';

const ImagesEditPage = (): JSX.Element => {
  const title = 'Edit Images';

  const {
    currentFilter,
    currentFolder,
    data,
    getFieldValue,
    handleChange,
    handleDelete,
    handleFilterSelect,
    handleFolderChange,
    handleRefresh,
    handleScan,
    handleSubmit,
    isError,
    isPending,
  } = useImagesEditPage();

  const { itemsAsListItem } = useArtistsItems();

  return (
    <>
      <Meta title={title} />
      <Layout.TitleFixed>
        <PageTitle title={title}>
          <MenuBar
            handleRefresh={handleRefresh}
            handleScan={handleScan}
            handleSubmit={handleSubmit}
          />
        </PageTitle>
      </Layout.TitleFixed>
      <Layout.Flex>
        <Layout.Content>
          <LoadingWrapper
            isPending={isPending}
            isError={isError}
          >
            <StyledForm
              noValidate
              onSubmit={handleSubmit}
            >
              {data.map((item) => (
                <ImageDetail
                  key={item.lineId}
                  getFieldValue={getFieldValue}
                  item={item}
                  names={itemsAsListItem}
                  onChange={handleChange}
                  onDelete={handleDelete}
                />
              ))}
            </StyledForm>
          </LoadingWrapper>
        </Layout.Content>
        <Layout.Aside>
          <Suspense fallback={<div>Loading...</div>}>
            <RightMenu
              currentFilter={currentFilter}
              currentFolder={currentFolder}
              onClick={handleFolderChange}
              onFilterSelect={handleFilterSelect}
            />
          </Suspense>
        </Layout.Aside>
      </Layout.Flex>
    </>
  );
};

ImagesEditPage.displayName = 'ImagesEditPage';
export default ImagesEditPage;

const StyledForm = styled.form`
  width: 100%;
`;
