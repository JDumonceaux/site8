import StyledLink from 'components/common/Link/StyledLink/StyledLink';
import StyledPlainButton from 'components/common/Link/StyledPlainButton/StyledPlainButton';
import LoadingWrapper from 'components/common/Loading/LoadingWrapper';
import Meta from 'components/common/Meta/Meta';
import PageTitle from 'components/common/PageTitle/PageTitle';
import StyledMain from 'components/common/StyledMain/StyledMain';
import { ImageSelector } from 'components/custom/ImageSelector/ImageSelector';
import { TextInput } from 'components/form/input';
import { TextArea } from 'components/form/input/TextArea';
import useImageEdit from 'hooks/useImageEdit';
import useSnackbar from 'hooks/useSnackbar';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { Image } from 'types';

const ImageEditImage = (): JSX.Element => {
  const params = useParams();
  const {
    formValues,
    isLoading,
    error,
    isSaved,
    handleChange,
    handleReset,
    getDefaultFields,
    submitForm,
    handleChangeImage,
  } = useImageEdit(params.id);

  const { setMessage } = useSnackbar();

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
    },
    [submitForm, error, setMessage],
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
            <StyledLink data-testid="nav-first" to="/admin/image/edit/first">
              First
            </StyledLink>
            <StyledLink data-testid="nav-prev" to="/admin/image/edit/prev">
              Prev
            </StyledLink>
            <StyledLink data-testid="nav-next" to="/admin/image/edit/next">
              Next
            </StyledLink>
            <StyledLink data-testid="nav-last" to="/admin/image/edit/last">
              Last
            </StyledLink>
            {!isSaved ? (
              <StyledPlainButton
                data-testid="button-save"
                onClick={handleSubmit}
                type="submit">
                Save
              </StyledPlainButton>
            ) : null}
            <StyledLink data-testid="nav-new" to="/admin/image/edit">
              New
            </StyledLink>
            <StyledLink data-testid="nav-list" to="/admin/images">
              List
            </StyledLink>
            <StyledPlainButton
              data-testid="button-reset"
              onClick={handleReset}
              type="reset">
              Reset
            </StyledPlainButton>
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
                </form>
              </FormContainer>
              <ImageContainer>
                <ImageSelector onSelectImage={(e) => handleSelectImage(e)} />
              </ImageContainer>
            </StyledContainer>
          </LoadingWrapper>
        </StyledMain.Section>
      </StyledMain>
    </>
  );
};

export default ImageEditImage;

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
