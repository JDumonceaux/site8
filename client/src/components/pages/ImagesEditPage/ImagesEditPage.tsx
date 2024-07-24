import { Cross2Icon } from '@radix-ui/react-icons';
import StyledPlainButton from 'components/common/Link/StyledPlainButton/StyledPlainButton';
import LoadingWrapper from 'components/common/Loading/LoadingWrapper';
import StyledMain from 'components/common/StyledMain/StyledMain';
import { TextInput } from 'components/form/input';
import { IconMenu } from 'components/ui/IconMenu/IconMenu';
import { IconMenuItem } from 'components/ui/IconMenu/IconMenuItem';
import Meta from 'components/ui/Meta/Meta';
import PageTitle from 'components/ui/PageTitle/PageTitle';
import useImageFolder from 'hooks/useImageFolder';
import useImagesEdit from 'hooks/useImagesEdit';
import useSnackbar from 'hooks/useSnackbar';
import React, { useCallback, useEffect, useState, useTransition } from 'react';
import { styled } from 'styled-components';

const ImagesEditPage = (): JSX.Element => {
  const title = 'Edit Images';
  const [isPending, startTransition] = useTransition();
  const [currFolder, setCurrFolder] = useState<string>('');
  const { setMessage } = useSnackbar();
  const { data: imageFolders } = useImageFolder();
  const {
    data,
    isLoading,
    error,
    getDefaultProps,
    submitForm,
    scanForNewItems,
    fetchItems,
    setFieldValue,
    getFieldValue,
  } = useImagesEdit();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleRefresh = useCallback(() => {
    setMessage('Updating...');
    startTransition(() => {
      fetchItems();
    });
    setMessage('Done');
  }, [fetchItems, setMessage]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.stopPropagation();
      e.preventDefault();
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
    },
    [setMessage, submitForm, handleRefresh, error],
  );

  const handleScan = useCallback(() => {
    setMessage('Scanning...');
    startTransition(() => {
      scanForNewItems();
    });
    setMessage('Done');
  }, [scanForNewItems, setMessage, startTransition]);

  const handleOnClick = useCallback((value: string) => {
    setCurrFolder((prev) => (prev === value ? '' : value));
  }, []);

  const handleOnDelete = useCallback(
    (localId: number) => {
      const prev = getFieldValue(localId, 'delete');
      setFieldValue(localId, 'delete', !prev);
    },
    [getFieldValue, setFieldValue],
  );

  const handleFolderClick = useCallback(
    (localId: number) => {
      setFieldValue(localId, 'folder', currFolder);
    },
    [currFolder, setFieldValue],
  );

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <StyledMain.Section>
          <PageTitle title={title}>
            <IconMenu>
              <IconMenuItem onClick={handleScan}>Scan for New</IconMenuItem>
              <IconMenuItem>
                <a
                  href="http://localhost:3005/api/images/list-duplicates"
                  rel="noreferrer"
                  target="_blank">
                  List Duplicates
                </a>
              </IconMenuItem>
              <IconMenuItem>
                <a
                  href="http://localhost:3005/api/images/fix-index"
                  rel="noreferrer"
                  target="_blank">
                  Fix Index
                </a>
              </IconMenuItem>
              <IconMenuItem>
                <a
                  href="http://localhost:3005/api/images/fix-file-names"
                  rel="noreferrer"
                  target="_blank">
                  Fix Names
                </a>
              </IconMenuItem>
            </IconMenu>
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
                  <StyledRow
                    $deleted={item.delete ? 'true' : 'false'}
                    key={item.localId}>
                    <StyledImgContainer>
                      <StyledImg alt={item.name} src={item.src} />
                    </StyledImgContainer>
                    <StyledOuterRow>
                      {item.duplicate === 'true' ? (
                        <StyledSubRow>Duplicate Image</StyledSubRow>
                      ) : null}
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
                            <Cross2Icon />
                            {/* <CheckIcon /> */}
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
                        <IconMenu>
                          <IconMenuItem
                            onClick={() => handleOnDelete(item.localId)}>
                            Delete
                          </IconMenuItem>
                          <IconMenuItem>{item.id}</IconMenuItem>
                        </IconMenu>
                      </StyledSubRow>
                      <StyledSubRow>
                        <TextInput
                          {...getDefaultProps(item.localId, 'description')}
                        />
                      </StyledSubRow>
                    </StyledOuterRow>
                  </StyledRow>
                ))}
              </StyledForm>
            </StyledContainer>
          </LoadingWrapper>
        </StyledMain.Section>
        <StyledMain.Aside>
          <StickyMenu>
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
          </StickyMenu>
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
  width: 250px;
`;
const StyledImg = styled.img`
  width: 200px;
`;
const StyledRow = styled.div<{
  $deleted?: 'true' | 'false';
}>`
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid var(--palette-samp);
  border: ${(props) =>
    props.$deleted === 'true' ? `1px solid var(--navbar-dark-3)` : undefined};
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
const StickyMenu = styled.div`
  position: sticky;
  top: 80px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  padding-bottom: 20px;
`;
