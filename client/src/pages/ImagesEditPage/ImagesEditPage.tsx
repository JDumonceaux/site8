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
import { getFips } from 'crypto';

const ImagesEditPage = (): React.JSX.Element => {
  const title = 'Edit Images';

  const {
    isLoading,
    isPending,
    data,
    error,
    imageFolders,
    currentFolder,
    getFieldValue,
    handleChange,
    handleOnClick,
    handleScan,
    handleFolderSelect,
    handleOnDelete,
    handleRefresh,
    handleSubmit,
  } = useImagesEditPage();

  console.log('data', data);

  return (
    <>
      <Meta title={title} />
      <Layout.TitleFixed>
        <PageTitle title={title}>
          <MenuBar
            handleScan={handleScan}
            handleRefresh={handleRefresh}
            handleSubmit={() => handleSubmit}
          />
        </PageTitle>
      </Layout.TitleFixed>
      <Layout.Flex>
        <Layout.Main>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <StyledContainer>
              {isPending ? <div>Loading ...</div> : null}
              <StyledForm noValidate onSubmit={handleSubmit}>
                {data?.map((item) => (
                  <ImageItem
                    key={item.localId}
                    item={item}
                    onFolderSelect={handleFolderSelect}
                    onDelete={handleOnDelete}
                    getFieldValue={getFieldValue}
                    onChange={handleChange}
                  />
                ))}
              </StyledForm>
            </StyledContainer>
          </LoadingWrapper>
        </Layout.Main>
        <Layout.Aside>
          <RightMenu
            data={imageFolders}
            currentFolder={currentFolder}
            handleOnClick={handleOnClick}
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
