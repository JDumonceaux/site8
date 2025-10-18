import React, { Suspense } from 'react';
import styled from 'styled-components';

import LoadingWrapper from '@components/core/Loading/LoadingWrapper';
import Meta from '@components/core/Meta/Meta';
import PageTitle from '@components/core/PageTitle/PageTitle';
import Layout from '@features/layouts/Layout/Layout';
import useArtistsItems from '@features/itemsAdd/useArtistsItems';

import ImageDetail from './ImageDetail';
import MenuBar from './MenuBar';
import RightMenu from './RightMenu';
import useImagesEditPage from './useImagesEditPage';

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
            isError={isError}
            isPending={isPending}
          >
            <StyledForm
              noValidate
              onSubmit={handleSubmit}
            >
              {data.map((item) => (
                <ImageDetail
                  key={item.lineId}
                  item={item}
                  names={itemsAsListItem}
                  getFieldValue={getFieldValue}
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
