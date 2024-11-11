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
    handleOnDelete,
    handleOnFolderClick,
    handleRefresh,
    handleScan,
    handleSubmit,
    isLoading,
    isPending,
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
            {isPending ? <div>Loading ...</div> : null}
            <StyledForm noValidate onSubmit={handleSubmit}>
              {data.map((item) => (
                <ImageItem
                  artistData={artistData}
                  getFieldValue={getFieldValue}
                  item={item}
                  key={item.localId}
                  onChange={handleChange}
                  onDelete={handleOnDelete}
                />
              ))}
            </StyledForm>
          </LoadingWrapper>
        </Layout.Main>
        <Layout.Aside>
          <RightMenu
            currentFilter={currentFilter}
            currentFolder={currentFolder}
            onClick={handleOnFolderClick}
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
