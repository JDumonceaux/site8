import React from 'react';
import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Layout from 'components/layouts/Layout/Layout';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import { styled } from 'styled-components';
import MenuBar from './MenuBar';
import RightMenu from './RightMenu';
import ImageItem from './ImageItem';
import useImagesEditPage from './useImagesEditPage';

const ImagesEditPage = (): React.JSX.Element => {
  const title = 'Edit Images';

  const {
    isLoading,
    isPending,
    data,
    error,
    currentFolder,
    currentFilter,
    getFieldValue,
    handleChange,
    handleOnFolderClick,
    handleScan,
    handleOnDelete,
    handleRefresh,
    handleSubmit,
    handleFilterSelect,
  } = useImagesEditPage();

  console.log('data', data);

  const filteredData = data?.slice(0, 10);

  return (
    <>
      <Meta title={title} />
      <Layout.TitleFixed>
        <PageTitle title={title}>
          <MenuBar
            handleScan={handleScan}
            handleRefresh={handleRefresh}
            handleSubmit={handleSubmit}
          />
        </PageTitle>
      </Layout.TitleFixed>
      <Layout.Flex>
        <Layout.Main>
          <LoadingWrapper error={error} isLoading={isLoading}>
            {isPending ? <div>Loading ...</div> : null}
            <StyledForm noValidate onSubmit={handleSubmit}>
              {filteredData?.map((item) => (
                <ImageItem
                  key={item.localId}
                  item={item}
                  onDelete={handleOnDelete}
                  getFieldValue={getFieldValue}
                  onChange={handleChange}
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

const StyledContainer = styled.div`
  display: flex;
  column-gap: 20px;
`;
const StyledForm = styled.form`
  width: 100%;
`;
