import React, { useEffect, useState, useTransition } from 'react';
import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Layout from 'components/layouts/Layout/Layout';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import useImageFolder from 'hooks/useImageFolder';
import useImagesEdit from 'hooks/useImagesEdit';
import useSnackbar from 'hooks/useSnackbar';
import { styled } from 'styled-components';
import MenuBar from './ImagesEditPage/MenuBar';
import RightMenu from './ImagesEditPage/RightMenu';
import ImageItem from './ImagesEditPage/ImageItem';

const ImagesEditPage = (): React.JSX.Element => {
  const title = 'Edit Images';
  const [isPending, startTransition] = useTransition();
  const [currentFolder, setCurrentFolder] = useState<string>('');
  const { setMessage } = useSnackbar();
  const { data: imageFolders } = useImageFolder();
  const {
    data,
    error,
    fetchItems,
    getFieldValue,
    isLoading,
    scanForNewItems,
    setFieldValue,
    submitForm,
  } = useImagesEdit();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleRefresh = () => {
    setMessage('Updating...');
    startTransition(() => {
      fetchItems();
    });
    setMessage('Done');
  };

  const handleSubmit = (error_: React.FormEvent) => {
    error_.stopPropagation();
    error_.preventDefault();
    setMessage('Saving...');

    const result = submitForm();
    if (result) {
      setMessage('Saved');
    } else {
      setMessage(`Error saving ${error}`);
    }
    if (result) {
      handleRefresh();
    }
  };

  const handleScan = () => {
    setMessage('Scanning...');
    startTransition(() => {
      scanForNewItems();
    });
    setMessage('Done');
  };

  const handleOnClick = (value: string) => {
    setCurrentFolder((previous) => (previous === value ? '' : value));
  };

  const handleOnDelete = (localId: number) => {
    const previous = getFieldValue(localId, 'delete');
    setFieldValue(localId, 'delete', !previous);
  };

  const handleFolderSelect = (localId: number) => {
    setFieldValue(localId, 'folder', currentFolder);
  };

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <Layout.Section>
          <PageTitle title={title}>
            <MenuBar
              handleScan={handleScan}
              handleRefresh={handleRefresh}
              handleSubmit={() => handleSubmit}
            />
          </PageTitle>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <StyledContainer>
              {isPending ? <div>Looking ...</div> : null}
              <StyledForm noValidate onSubmit={handleSubmit}>
                {data?.map((item) => (
                  <ImageItem
                    item={item}
                    onFolderSelect={handleFolderSelect}
                    onDelete={handleOnDelete}
                  />
                ))}
              </StyledForm>
            </StyledContainer>
          </LoadingWrapper>
        </Layout.Section>
        <Layout.Aside>
          <RightMenu
            data={imageFolders}
            currentFolder={currentFolder}
            handleOnClick={handleOnClick}
          />
        </Layout.Aside>
      </Layout.Main>
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
