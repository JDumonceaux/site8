import { LoadingWrapper, Meta, PageTitle, StyledPlainButton } from 'components';
import StyledMain from 'components/common/StyledMain/StyledMain';
import { TextInput } from 'components/form/input';
import { SelectIcon } from 'components/icons/SelectIcon';
import useImageFolder from 'hooks/useImageFolder';
import useImagesEdit from 'hooks/useImagesEdit';
import useSnackbar from 'hooks/useSnackbar';
import { useCallback, useState, useTransition } from 'react';
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
    setFieldValue,
  } = useImagesEdit();

  const { setSnackbarMessage } = useSnackbar();

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
    },
    [submitForm, error, setSnackbarMessage],
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
            <StyledPlainButton
              data-testid="button-scan"
              onClick={handleScan}
              type="submit">
              Scan for New
            </StyledPlainButton>
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
            <StyledPlainButton
              data-testid="button-clear"
              onClick={handleClear}
              type="reset">
              Clear All
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
          <hr />
          {imageFolders?.map((folder, index) => (
            <StyledButton
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={() => handleOnClick(folder)}
              type="button">
              {folder}
            </StyledButton>
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
  padding: 5px 0;
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
