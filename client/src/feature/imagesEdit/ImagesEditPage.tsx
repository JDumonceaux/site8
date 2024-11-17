import React from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'components/layouts/Layout/Layout';
import { styled } from 'styled-components';

import ImageItem from './ImageItem';
import MenuBar from './MenuBar';
import RightMenu from './RightMenu';
import useImagesEditPage from './useImagesEditPage';

const ImagesEditPage = (): React.JSX.Element => {
  const title = 'Edit Images';

  const {
    artistData,
    currentFilter,
    currentFolder,
    data,
    error,
    getFieldValue,
    handleChange,
    handleFilterSelect,
    handleDelete,
    handleFolderClick,
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
                <ImageItem
                  artistData={artistData}
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
          <RightMenu
            currentFilter={currentFilter}
            currentFolder={currentFolder}
            onClick={handleFolderClick}
            onFilterSelect={handleFilterSelect}
          />
        </Layout.Aside>
      </Layout.Flex>
    </>
  );
};

export default ImagesEditPage;

const StyledForm = styled.form`
  width: 100%;
`;
