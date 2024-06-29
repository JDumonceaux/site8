import { LoadingWrapper, Meta, PageTitle, StyledPlainButton } from 'components';
import StyledMain from 'components/common/StyledMain/StyledMain';
import { TextInput } from 'components/form/input';
import useImagesEdit from 'hooks/useImagesEdit';
import useSnackbar from 'hooks/useSnackbar';
import { useCallback, useTransition } from 'react';
import { styled } from 'styled-components';

const ImagesEditPage = (): JSX.Element => {
  const [isPending, startTransition] = useTransition();

  const {
    isLoading,
    error,
    isSaved,
    handleChange,
    handleClear: onClear,
    getDefaultFields,
    submitForm,
    scanForNewItems,
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
            {!isSaved ? (
              <StyledPlainButton
                data-testid="button-save"
                onClick={handleSubmit}
                type="submit">
                Save
              </StyledPlainButton>
            ) : null}
            <StyledPlainButton
              data-testid="button-clear"
              onClick={handleClear}
              type="reset">
              Clear All
            </StyledPlainButton>
          </PageTitle>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <StyledContainer>
              {isPending ? <div>Looking ...</div> : null}
              <form noValidate onSubmit={handleSubmit}>
                <Row>
                  <div>Image</div>
                  <TextInput
                    autoCapitalize="off"
                    enterKeyHint="next"
                    errorTextShort="Please enter a name"
                    inputMode="text"
                    onChange={handleChange}
                    required={true}
                    spellCheck={true}
                    {...getDefaultFields('name')}
                  />
                  <TextInput
                    autoCapitalize="off"
                    enterKeyHint="next"
                    errorTextShort="Please enter a location"
                    inputMode="text"
                    onChange={handleChange}
                    required={true}
                    spellCheck={true}
                    {...getDefaultFields('location')}
                  />
                  <TextInput
                    autoCapitalize="off"
                    enterKeyHint="next"
                    errorTextShort="Please enter a File Name"
                    inputMode="text"
                    onChange={handleChange}
                    required={true}
                    spellCheck={true}
                    {...getDefaultFields('fileName')}
                  />
                  <TextInput
                    autoCapitalize="off"
                    enterKeyHint="next"
                    errorTextShort="Please enter a official URL"
                    inputMode="text"
                    onChange={handleChange}
                    required={false}
                    spellCheck={true}
                    {...getDefaultFields('official_url')}
                  />
                </Row>
              </form>
            </StyledContainer>
          </LoadingWrapper>
        </StyledMain.Section>
      </StyledMain>
    </>
  );
};

export default ImagesEditPage;

const StyledContainer = styled.div`
  display: flex;
  column-gap: 20px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
`;
