import { type JSX, Suspense, useActionState } from 'react';

import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import useArtistsItems from '@features/items-add/useArtistsItems';
import Layout from '@features/layouts/layout/Layout';
import ImageDetail from './ImageDetail';
import MenuBar from './MenuBar';
import RightMenu from './RightMenu';
import useImagesEditPage from './useImagesEditPage';
import styled from 'styled-components';
import type { FormState } from '@types';

const submitAction = async (
  _prevState: unknown,
  _formData: FormData,
): Promise<FormState<null>> => {
  try {
    // TODO: Implement save logic
    // const updates = JSON.parse(formData.get('updates') as string);
    // await saveItems(updates);

    return {
      fieldData: null,
      message: 'Saved successfully',
    };
  } catch (error) {
    return {
      fieldData: null,
      message: error instanceof Error ? error.message : 'Failed to save',
    };
  }
};

const ImagesEditPage = (): JSX.Element => {
  const title = 'Edit Images';

  const [submitState, submitFormAction, isSubmitting] = useActionState(
    submitAction,
    { fieldData: null },
  );

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
    isError,
    isPending,
  } = useImagesEditPage(submitState);

  const { itemsAsListItem } = useArtistsItems();

  return (
    <>
      <Meta title={title} />
      <Layout.TitleFixed>
        <PageTitle title={title}>
          <MenuBar
            handleRefresh={handleRefresh}
            handleScan={handleScan}
            isSubmitting={isSubmitting}
          />
        </PageTitle>
      </Layout.TitleFixed>
      <Layout.Flex>
        <Layout.Content>
          <LoadingWrapper
            isPending={isPending || isSubmitting}
            isError={isError}
          >
            <StyledForm
              noValidate
              action={submitFormAction}
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

