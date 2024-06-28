import { LoadingWrapper, Meta, PageTitle, StyledPlainButton } from 'components';
import { ModalProcessing } from 'components/common/ModalProcessing';
import StyledMain from 'components/common/StyledMain/StyledMain';
import { Button } from 'components/form/Button';
import { TextInput } from 'components/form/input';
import useImagesEdit from 'hooks/useImagesEdit';
import useSnackbar from 'hooks/useSnackbar';
import { useCallback, useState } from 'react';
import { styled } from 'styled-components';

const ImagesEditPage = (): JSX.Element => {
  // const [showErrorOverlay, setShowErrorOverlay] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    isProcessing,
    isLoading,
    error,
    isSaved,
    handleChange,
    handleClear: onClear,
    getDefaultFields,
    submitForm,
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
              <form noValidate onSubmit={handleSubmit}>
                <Row>
                  <div>Image</div>
                  <TextInput
                    autoCapitalize="off"
                    enterKeyHint="next"
                    errorTextShort="Please enter a name"
                    inputMode="text"
                    label="Name"
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
                    label="Location"
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
                    label="File Name"
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
                    label="Official URL"
                    onChange={handleChange}
                    required={false}
                    spellCheck={true}
                    {...getDefaultFields('official_url')}
                  />
                </Row>
                <Button id="submit" type="submit">
                  {isProcessing ? 'Processing' : 'Submit'}
                </Button>
              </form>
            </StyledContainer>
          </LoadingWrapper>
        </StyledMain.Section>
      </StyledMain>
      <ModalProcessing isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ImagesEditPage;

const StyledContainer = styled.div`
  display: flex;
  column-gap: 20px;
`;
const Row = styled.div`
  display: flex:
  flex-direction: row;
  justify-content: left;
`;
