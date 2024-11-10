import LoadingWrapper from 'components/core/Loading/LoadingWrapper';

import ImageSelector from 'components/custom/ImageSelector/ImageSelector';
import Input from 'components/Input/Input';
import { TextArea } from 'components/Input/TextArea/TextArea';
import Layout from 'components/layouts/Layout/Layout';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import StyledPlainButton from 'components/Link/StyledPlainButton/StyledPlainButton';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import useImageEdit from './useImageEdit';
import useSnackbar from 'hooks/useSnackbar';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { Image } from 'types/Image';

const ImageEditImage = (): JSX.Element => {
  const parameters = useParams();
  const {
    error,
    formValues,
    getDefaultProps,
    handleChangeImage,
    handleReset,
    isLoading,
    isSaved,
    submitForm,
  } = useImageEdit(parameters.id);

  const { setMessage } = useSnackbar();

  const handleSubmit = useCallback(
    (error_: React.FormEvent) => {
      error_.stopPropagation();
      error_.preventDefault();
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
      <Layout.Main>
        <Layout.Section>
          <PageTitle title={title}>
            {isSaved ? null : (
              <StyledPlainButton
                data-testid="button-save"
                onClick={handleSubmit}
                type="submit">
                Save
              </StyledPlainButton>
            )}
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
                  <Input.Text
                    autoCapitalize="off"
                    enterKeyHint="next"
                    //errorTextShort="Please enter a short title"
                    inputMode="text"
                    label="Short Title"
                    required
                    spellCheck
                    // {...getStandardInputTextAttributes('name')}
                    //ref={focusElement}
                    {...getDefaultProps('name')}
                  />
                  <Input.Text
                    autoCapitalize="off"
                    enterKeyHint="next"
                    // errorTextShort="Please enter a location"
                    inputMode="text"
                    label="Location"
                    required
                    spellCheck
                    //ref={focusElement}
                    {...getDefaultProps('location')}
                  />
                  <Input.Text
                    autoCapitalize="off"
                    enterKeyHint="next"
                    //   errorTextShort="Please enter a File Name"
                    inputMode="text"
                    label="File Name"
                    required
                    spellCheck
                    {...getDefaultProps('fileName')}
                    //ref={focusElement}
                  />
                  <Input.Text
                    autoCapitalize="off"
                    enterKeyHint="next"
                    //  errorTextShort="Please enter a image path"
                    inputMode="text"
                    label="SRC"
                    required
                    spellCheck
                    {...getDefaultProps('src')}
                    //ref={focusElement}
                  />
                  <Input.Text
                    // errorTextShort="Please enter a folder"
                    label="Folder"
                    required={false}
                    //   type="text"
                    {...getDefaultProps('folder')}
                  />
                  <Input.Text
                    autoCapitalize="off"
                    enterKeyHint="next"
                    //    errorTextShort="Please enter a official URL"
                    inputMode="text"
                    label="Official URL"
                    required={false}
                    spellCheck
                    {...getDefaultProps('official_url')}
                    //ref={focusElement}
                  />
                  <Input.Text
                    autoCapitalize="off"
                    enterKeyHint="next"
                    //  errorTextShort="Please enter a tag"
                    inputMode="text"
                    label="Tags"
                    required={false}
                    spellCheck
                    {...getDefaultProps('tags')}
                    //ref={focusElement}
                  />
                  <TextArea
                    label="Description"
                    rows={30}
                    spellCheck
                    {...getDefaultProps('description')}
                    // required
                  />
                </form>
              </FormContainer>
              <ImageContainer>
                <ImageSelector
                  onSelectImage={(error_) => handleSelectImage(error_)}
                />
              </ImageContainer>
            </StyledContainer>
          </LoadingWrapper>
        </Layout.Section>
      </Layout.Main>
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
