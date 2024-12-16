import React, { Suspense } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'components/layouts/Layout/Layout';
import { styled } from 'styled-components';

import ImageDetail from './ImageDetail';
import MenuBar from './MenuBar';
import RightMenu from './RightMenu';
import useImagesEditPage from './useImagesEditPage';

const ImagesEditPage = (): React.JSX.Element => {
  const title = 'Edit Images';

  const {
    artists,
    currentFilter,
    currentFolder,
    data,
    error,
    getFieldValue,
    handleChange,
    handleDelete,
    handleFilterSelect,
    handleFolderChange,
    handleRefresh,
    handleScan,
    handleSubmit,
    isLoading,
  } = useImagesEditPage();

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
        <Layout.Main>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <StyledForm noValidate onSubmit={handleSubmit}>
              {data.map((item) => (
                <ImageDetail
                  artists={artists}
                  getFieldValue={getFieldValue}
                  item={item}
                  key={item.lineId}
                  onChange={handleChange}
                  onDelete={handleDelete}
                />
              ))}
            </StyledForm>
          </LoadingWrapper>
        </Layout.Main>
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

export default ImagesEditPage;

const StyledForm = styled.form`
  width: 100%;
`;
