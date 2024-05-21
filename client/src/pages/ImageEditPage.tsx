'use client';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import useImageEdit from 'hooks/useImageEdit';
import { ModalProcessing } from 'components/common/ModalProcessing';

import { TextInput } from 'components/form/input';

import useSnackbar from 'hooks/useSnackbar';
import { Image } from 'services/types';

import { TextArea } from 'components/form/input/TextArea';
import { Button } from 'components/form/Button';
import { styled } from 'styled-components';
import { Meta, PageTitle, StyledPlainButton, LoadingWrapper } from 'components';
import StyledLink from 'components/common/Link/StyledLink/StyledLink';
import StyledMain from 'components/common/StyledMain/StyledMain';
import { ImageSelector } from 'components/custom/ImageSelector/ImageSelector';

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
    getFieldErrors,
    handleChange,
    handleClear: onClear,
    handleReset,
    hasError,
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
                    errorText={getFieldErrors('name')}
                    errorTextShort="Please enter a short title"
                    hasError={hasError('name')}
                    id="name"
                    inputMode="text"
                    label="Short Title"
                    onChange={handleChange}
                    required={true}
                    spellCheck={true}
                    value={formValues.name}
                    // {...getStandardTextInputAttributes('name')}
                    //ref={focusElement}
                  />
                  <TextInput
                    autoCapitalize="off"
                    enterKeyHint="next"
                    errorText={getFieldErrors('location')}
                    errorTextShort="Please enter a location"
                    hasError={hasError('location')}
                    id="location"
                    inputMode="text"
                    label="Location"
                    onChange={handleChange}
                    required={true}
                    spellCheck={true}
                    value={formValues.location}
                    //ref={focusElement}
                  />
                  <TextInput
                    autoCapitalize="off"
                    enterKeyHint="next"
                    errorText={getFieldErrors('fileName')}
                    errorTextShort="Please enter a File Name"
                    hasError={hasError('fileName')}
                    id="fileName"
                    inputMode="text"
                    label="File Name"
                    onChange={handleChange}
                    required={true}
                    spellCheck={true}
                    value={formValues.fileName}
                    //ref={focusElement}
                  />
                  <TextInput
                    autoCapitalize="off"
                    enterKeyHint="next"
                    errorText={getFieldErrors('src')}
                    errorTextShort="Please enter a image path"
                    hasError={hasError('src')}
                    id="src"
                    inputMode="text"
                    label="SRC"
                    onChange={handleChange}
                    required={true}
                    spellCheck={true}
                    value={formValues.src}
                    //ref={focusElement}
                  />
                  <TextInput
                    errorText={getFieldErrors('folder')}
                    errorTextShort="Please enter a folder"
                    hasError={hasError('folder')}
                    id="folderId"
                    label="Folder"
                    onChange={handleChange}
                    required={false}
                    type="description"
                    value={formValues.folder}
                  />
                  <TextInput
                    autoCapitalize="off"
                    enterKeyHint="next"
                    errorText={getFieldErrors('official_url')}
                    errorTextShort="Please enter a official URL"
                    hasError={hasError('official_url')}
                    id="official_url"
                    inputMode="text"
                    label="Official URL"
                    onChange={handleChange}
                    required={false}
                    spellCheck={true}
                    value={formValues.official_url}
                    //ref={focusElement}
                  />
                  <TextInput
                    autoCapitalize="off"
                    enterKeyHint="next"
                    errorText={getFieldErrors('tags')}
                    errorTextShort="Please enter a tag"
                    hasError={hasError('tags')}
                    id="tags"
                    inputMode="text"
                    label="Tags"
                    onChange={handleChange}
                    required={false}
                    spellCheck={true}
                    value={formValues.tags}
                    //ref={focusElement}
                  />

                  <TextArea
                    errorText={getFieldErrors('description')}
                    hasError={hasError('description')}
                    id="description"
                    label="Description"
                    onChange={handleChange}
                    rows={30}
                    spellCheck={true}
                    value={formValues.description}
                    // required={true}
                  />
                  <TextInput
                    errorText={getFieldErrors('edit_date')}
                    errorTextShort="Please enter a date"
                    hasError={hasError('edit_date')}
                    id="edit_date"
                    label="Edit Date"
                    maxLength={10}
                    onChange={handleChange}
                    spellCheck={false}
                    value={formValues.edit_date}
                    // required={true}
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
