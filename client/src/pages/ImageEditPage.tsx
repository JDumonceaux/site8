import LoadingWrapper from 'components/common/Loading/LoadingWrapper';
import StyledMain from 'components/common/StyledMain/StyledMain';
import { ImageSelector } from 'components/custom/ImageSelector/ImageSelector';
import { TextArea } from 'components/form/input/TextArea';
import { TextInput } from 'components/ui/Input';
import StyledLink from 'components/ui/Link/StyledLink/StyledLink';
import StyledPlainButton from 'components/ui/Link/StyledPlainButton/StyledPlainButton';
import Meta from 'components/ui/Meta/Meta';
import PageTitle from 'components/ui/PageTitle/PageTitle';
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

  const handleSelectImage = (item: Image | undefined) => {
    handleChangeImage(item);
  };

  const title = formValues.id ? `Edit Image ${formValues.id}` : 'New Image';

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
                    required
                    spellCheck
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
                    required
                    spellCheck
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
                    required
                    spellCheck
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
                    required
                    spellCheck
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
                    spellCheck
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
                    spellCheck
                    {...getDefaultFields('tags')}
                    //ref={focusElement}
                  />
                  <TextArea
                    label="Description"
                    onChange={handleChange}
                    rows={30}
                    spellCheck
                    {...getDefaultFields('description')}
                    // required
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
