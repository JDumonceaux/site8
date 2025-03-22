import React, { Suspense, useCallback, useMemo } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Layout from 'components/layouts/Layout/Layout';
import useArtistsItems from 'features/itemsAdd/useArtistsItems';
import { styled } from 'styled-components';

import ImageDetail from './ImageDetail';
import MenuBar from './MenuBar';
import RightMenu from './RightMenu';
import useImagesEditPage from './useImagesEditPage';

const ImagesEditPage = (): React.JSX.Element => {
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

  // Memoize handlers to ensure stable references
  const memoizedGetFieldValue = useCallback(getFieldValue, [getFieldValue]);
  const memoizedHandleChange = useCallback(handleChange, [handleChange]);
  const memoizedHandleDelete = useCallback(handleDelete, [handleDelete]);

  const memoizedHandleFolderChange = useCallback(handleFolderChange, [
    handleFolderChange,
  ]);
  const memoizedHandleFilterSelect = useCallback(handleFilterSelect, [
    handleFilterSelect,
  ]);

  const memoizedHandleScan = useCallback(handleScan, [handleScan]);
  const memoizedHandleRefresh = useCallback(handleRefresh, [handleRefresh]);
  const memoizedHandleSubmit = useCallback(handleSubmit, [handleSubmit]);

  // Memoize itemsAsListItem to ensure a stable reference
  const memoizedItemsAsListItem = useMemo(
    () => itemsAsListItem,
    [itemsAsListItem],
  );

  return (
    <>
      <Meta title={title} />
      <Layout.TitleFixed>
        <PageTitle title={title}>
          <MenuBar
            handleRefresh={memoizedHandleRefresh}
            handleScan={memoizedHandleScan}
            handleSubmit={memoizedHandleSubmit}
          />
        </PageTitle>
      </Layout.TitleFixed>
      <Layout.Flex>
        <Layout.Main>
          <LoadingWrapper isError={isError} isPending={isPending}>
            <StyledForm noValidate onSubmit={memoizedHandleSubmit}>
              {data.map((item) => (
                <ImageDetail
                  getFieldValue={memoizedGetFieldValue}
                  item={item}
                  key={item.lineId}
                  names={memoizedItemsAsListItem}
                  onChange={memoizedHandleChange}
                  onDelete={memoizedHandleDelete}
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
              onClick={memoizedHandleFolderChange}
              onFilterSelect={memoizedHandleFilterSelect}
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
