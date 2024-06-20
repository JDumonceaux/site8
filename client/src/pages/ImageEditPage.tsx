import { LoadingWrapper, Meta, PageTitle, StyledPlainButton } from 'components';
import StyledLink from 'components/common/Link/StyledLink/StyledLink';
import { ModalProcessing } from 'components/common/ModalProcessing';
import StyledMain from 'components/common/StyledMain/StyledMain';
import { ImageSelector } from 'components/custom/ImageSelector/ImageSelector';
import { Button } from 'components/form/Button';
import { TextInput } from 'components/form/input';
import { TextArea } from 'components/form/input/TextArea';
import useImageEdit from 'hooks/useImageEdit';
import useSnackbar from 'hooks/useSnackbar';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { Image } from 'types';

const ImageEditImage = (): JSX.Element => {
  const params = useParams();
  // const [showErrorOverlay, setShowErrorOverlay] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    formValues,
    isProcessing,
    isLoading,
    error,
    isSaved,
    handleChange,
    handleClear: onClear,
    handleReset,
    getDefaultFields,
    submitForm,
    handleChangeImage,
  } = useImageEdit(params.id);

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

  const handleSelectImage = useCallback(
    (item: Image | undefined) => {
      handleChangeImage(item);
    },
    [handleChangeImage],
  );

  const title = formValues.id ? `Edit Image ${formValues.id}` : 'New Image';

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <StyledMain.Section>
          <PageTitle title={title}>
            <StyledMenu>
              <li>
                <StyledLink
                  data-testid="nav-first"
                  to="/admin/image/edit/first">
                  First
                </StyledLink>
              </li>
              <li>
                <StyledLink data-testid="nav-prev" to="/admin/image/edit/prev">
                  Prev
                </StyledLink>
              </li>
              <li>
                <StyledLink data-testid="nav-next" to="/admin/image/edit/next">
                  Next
                </StyledLink>
              </li>
              <li>
                <StyledLink data-testid="nav-last" to="/admin/image/edit/last">
                  Last
                </StyledLink>
              </li>
              {!isSaved ? (
                <li>
                  <StyledPlainButton
                    data-testid="button-save"
                    onClick={handleSubmit}
                    type="submit">
                    Save
                  </StyledPlainButton>
                </li>
              ) : null}
              <li>
                <StyledLink data-testid="nav-new" to="/admin/image/edit">
                  New
                </StyledLink>
              </li>
              <li>
                <StyledLink data-testid="nav-list" to="/admin/images">
                  List
                </StyledLink>
              </li>
              <li>
                <StyledPlainButton
                  data-testid="button-reset"
                  onClick={handleReset}
                  type="reset">
                  Reset
                </StyledPlainButton>
              </li>
              <li>
                <StyledPlainButton
                  data-testid="button-clear"
                  onClick={handleClear}
                  type="reset">
                  Clear All
                </StyledPlainButton>
              </li>
            </StyledMenu>
          </PageTitle>
          <LoadingWrapper error={error} isLoading={isLoading}>
            <StyledContainer>
              <FormContainer>
                <form noValidate onSubmit={handleSubmit}>
                  <TextInput
                    autoCapitalize="off"
                    enterKeyHint="next"
                    errorTextShort="Please enter a short title"
                    inputMode="text"
                    label="Short Title"
                    onChange={handleChange}
                    required={true}
                    spellCheck={true}
                    // {...getStandardTextInputAttributes('name')}
                    //ref={focusElement}
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
                    //ref={focusElement}
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
                    //ref={focusElement}
                  />
                  <TextInput
                    autoCapitalize="off"
                    enterKeyHint="next"
                    errorTextShort="Please enter a image path"
                    inputMode="text"
                    label="SRC"
                    onChange={handleChange}
                    required={true}
                    spellCheck={true}
                    {...getDefaultFields('src')}
                    //ref={focusElement}
                  />
                  <TextInput
                    errorTextShort="Please enter a folder"
                    label="Folder"
                    onChange={handleChange}
                    required={false}
                    type="text"
                    {...getDefaultFields('folder')}
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
                    //ref={focusElement}
                  />
                  <TextInput
                    autoCapitalize="off"
                    enterKeyHint="next"
                    errorTextShort="Please enter a tag"
                    inputMode="text"
                    label="Tags"
                    onChange={handleChange}
                    required={false}
                    spellCheck={true}
                    {...getDefaultFields('tags')}
                    //ref={focusElement}
                  />

                  <TextArea
                    label="Description"
                    onChange={handleChange}
                    rows={30}
                    spellCheck={true}
                    {...getDefaultFields('description')}
                    // required={true}
                  />
                  <TextInput
                    errorTextShort="Please enter a date"
                    label="Edit Date"
                    maxLength={10}
                    onChange={handleChange}
                    spellCheck={false}
                    // required={true}
                    {...getDefaultFields('edit_date')}
                  />

                  <Button id="submit" type="submit">
                    {isProcessing ? 'Processing' : 'Submit'}
                  </Button>
                </form>
              </FormContainer>
              <ImageContainer>
                <ImageSelector onSelectImage={(e) => handleSelectImage(e)} />
              </ImageContainer>
            </StyledContainer>
          </LoadingWrapper>
        </StyledMain.Section>
      </StyledMain>
      <ModalProcessing isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ImageEditImage;

const StyledMenu = styled.menu`
  display: inline-flex;
  list-style-type: none;
`;
const StyledContainer = styled.div`
  display: flex;
  column-gap: 20px;
`;
const ImageContainer = styled.div`
  flex-basis: 30%;
`;
const FormContainer = styled.div`
  flex-basis: 70%;
`;
