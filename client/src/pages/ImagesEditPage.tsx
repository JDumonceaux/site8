import { LoadingWrapper, Meta, PageTitle, StyledPlainButton } from 'components';
import StyledMain from 'components/common/StyledMain/StyledMain';
import { TextInput } from 'components/form/input';
import { SelectIcon } from 'components/icons/SelectIcon';
import useImageFolder from 'hooks/useImageFolder';
import useImagesEdit from 'hooks/useImagesEdit';
import useSnackbar from 'hooks/useSnackbar';
import React, { useCallback, useEffect, useState, useTransition } from 'react';
import { styled } from 'styled-components';

import { IMAGE_BASE } from 'utils';

const ImagesEditPage = (): JSX.Element => {
  const [isPending, startTransition] = useTransition();
  const [currFolder, setCurrFolder] = useState<string>('');

  const { data: imageFolders } = useImageFolder();
  const {
    data,
    isLoading,
    error,
    getDefaultProps,
    handleClear: onClear,
    submitForm,
    scanForNewItems,
    refreshItems,
    setFieldValue,
    fetchData,
  } = useImagesEdit();
  const { setSnackbarMessage } = useSnackbar();

  useEffect(() => {
    refreshItems();
  }, [fetchData, refreshItems]);

  const handleRefresh = useCallback(() => {
    setSnackbarMessage('Updating...');
    startTransition(() => {
      refreshItems();
    });
    setSnackbarMessage('Done');
  }, [refreshItems, setSnackbarMessage]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setSnackbarMessage('Saving...');

      const result = submitForm();
      if (result) {
        setSnackbarMessage('Saved');
      } else {
        setSnackbarMessage(`Error saving ${error}`);
      }
      if (result) {
        handleRefresh();
      }
    },
    [setSnackbarMessage, submitForm, handleRefresh, error],
  );

  const handleScan = useCallback(() => {
    setSnackbarMessage('Scanning...');
    startTransition(() => {
      scanForNewItems();
    });
    setSnackbarMessage('Done');
  }, [scanForNewItems, setSnackbarMessage, startTransition]);

  const handleClear = useCallback(
    (e: React.FormEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onClear();
    },
    [onClear],
  );

  const handleOnClick = useCallback((value: string) => {
    setCurrFolder((prev) => (prev === value ? '' : value));
  }, []);

  const handleFolderClick = useCallback(
    (localId: number) => {
      setFieldValue(localId, 'folder', currFolder);
    },
    [currFolder, setFieldValue],
  );

  const title = 'Edit Images';

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <StyledMain.Section>
          <PageTitle title={title}>
            <a
              href="http://localhost:3005/api/images/fix-file-names"
              rel="noreferrer"
              target="_blank">
              Fix Names
            </a>
            <a
              href="http://localhost:3005/api/images/fix-index"
              rel="noreferrer"
              target="_blank">
              Fix Index
            </a>
            <a
              href="http://localhost:3005/api/images/list-duplicates"
              rel="noreferrer"
              target="_blank">
              List Duplicates
            </a>
            <a
              href="http://localhost:3005/api/images/sync"
              rel="noreferrer"
              target="_blank">
              Sync
            </a>
            <StyledPlainButton
              data-testid="button-clear"
              onClick={handleClear}
              type="reset">
              Clear All
            </StyledPlainButton>
            <StyledPlainButton
              data-testid="button-scan"
              onClick={handleScan}
              type="submit">
              Scan for New
            </StyledPlainButton>
            <StyledPlainButton
              data-testid="button-refresh"
              onClick={handleRefresh}
              type="submit">
              Refresh
            </StyledPlainButton>
            <StyledPlainButton
              data-testid="button-save"
              onClick={handleSubmit}
              type="submit">
              Save
            </StyledPlainButton>
          </PageTitle>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <StyledContainer>
              {isPending ? <div>Looking ...</div> : null}
              <StyledForm noValidate onSubmit={handleSubmit}>
                {data?.map((item) => (
                  <StyledRow key={item.localId}>
                    <StyledImgContainer>
                      <StyledImg
                        alt={item.name}
                        src={`${IMAGE_BASE}/${item.src}`}
                      />
                    </StyledImgContainer>
                    <StyledOuterRow>
                      <StyledSubRow>
                        <TextInput {...getDefaultProps(item.localId, 'name')} />

                        <TextInput
                          {...getDefaultProps(item.localId, 'fileName')}
                        />
                        <TextInput
                          {...getDefaultProps(item.localId, 'folder')}
                        />
                        <div>
                          <StyledButton2
                            onClick={() => handleFolderClick(item.localId)}
                            type="button">
                            <SelectIcon />
                          </StyledButton2>
                        </div>
                      </StyledSubRow>
                      <StyledSubRow>
                        <TextInput
                          {...getDefaultProps(item.localId, 'location')}
                        />
                        <TextInput
                          {...getDefaultProps(item.localId, 'official_url')}
                        />
                        <div>{item.id}</div>
                      </StyledSubRow>
                    </StyledOuterRow>
                  </StyledRow>
                ))}
              </StyledForm>
            </StyledContainer>
          </LoadingWrapper>
        </StyledMain.Section>
        <StyledMain.Aside>
          <StyledHeader>
            <div>
              {currFolder && currFolder.length > 0 ? (
                <StyledButton
                  // eslint-disable-next-line react/no-array-index-key
                  onClick={() => handleOnClick('')}
                  type="button">
                  {currFolder}
                </StyledButton>
              ) : (
                <div>Select Folder</div>
              )}
            </div>
            <div>{data.length}</div>
          </StyledHeader>
          <hr />
          {imageFolders?.map((folder) => (
            <React.Fragment key={folder.id}>
              {folder.name === currFolder ? (
                <StyledActiveButton
                  onClick={() => handleOnClick(folder.name)}
                  type="button">
                  {folder.name}
                </StyledActiveButton>
              ) : (
                <StyledButton
                  onClick={() => handleOnClick(folder.name)}
                  type="button">
                  {folder.name}
                </StyledButton>
              )}
            </React.Fragment>
          ))}
        </StyledMain.Aside>
      </StyledMain>
    </>
  );
};

export default ImagesEditPage;

const StyledContainer = styled.div`
  display: flex;
  column-gap: 20px;
`;
const StyledButton = styled.button`
  display: block;
  width: 100%;
  padding: 5px 0;
  text-align: left;
`;
const StyledActiveButton = styled.button`
  display: block;
  width: 100%;
  padding: 5px 0;
  color: var(--navbar-dark-primary);
  background-color: var(--palette-samp);
  text-align: left;
`;
const StyledButton2 = styled.button`
  padding: 0 5px;
  width: 30px;
  height: 35px;
`;
const StyledForm = styled.form`
  width: 100%;
`;
const StyledImgContainer = styled.div`
  display: flex;
  align-items: left;
  justify-content: top;
  margin-right: 20px;
  width: 150px;
`;
const StyledImg = styled.img`
  width: 100px;
`;
const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 100%;
`;
const StyledOuterRow = styled.div`
  flex-grow: 1;
`;
const StyledSubRow = styled.div`
  display: flex;
  width: 100%;
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  align-items: baseline;
`;
