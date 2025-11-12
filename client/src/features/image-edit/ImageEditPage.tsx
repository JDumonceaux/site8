import { type JSX, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import LoadingWrapper from '@components/core/loading/LoadingWrapper';
import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page-title/PageTitle';
import ImageSelector from '@components/custom/image-selector/ImageSelector';
import Input from '@components/input/Input';
import StyledLink from '@components/link/styled-link/StyledLink';
import StyledPlainButton from '@components/link/styled-plain-button/StyledPlainButton';
import Layout from '@features/layouts/Layout/Layout';
import styled from 'styled-components';
import useSnackbar from '@/features/app/snackbar/useSnackbar';
import type { Image } from '../../types';
import useImageEdit from './useImageEdit';

const ImageEditImage = (): JSX.Element => {
  const parameters = useParams();
  const { id } = parameters as { id: string };
  const {
    error,
    formValues,
    getDefaultProps,
    handleChangeImage,
    handleReset,
    isLoading,
    isSaved,
    submitForm,
  } = useImageEdit(id);

  const { setMessage } = useSnackbar();

  const handleSubmit = (error_: React.FormEvent) => {
    error_.stopPropagation();
    error_.preventDefault();
    setMessage('Saving...');
    submitForm();
  };

  const handleSelectImage = (item: Image | null | undefined) => {
    handleChangeImage(item);
  };

  const title = formValues.id ? `Edit Image ${formValues.id}` : 'New Image';

  const inputTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputTitleRef.current?.focus();
  });

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <Layout.Section>
          <PageTitle title={title}>
            {isSaved ? null : (
              <StyledPlainButton
                data-testid="button-save"
                type="submit"
                onClick={handleSubmit}
              >
                Save
              </StyledPlainButton>
            )}
            <StyledLink
              data-testid="nav-new"
              to="/admin/image/edit"
            >
              New
            </StyledLink>
            <StyledLink
              data-testid="nav-list"
              to="/admin/images"
            >
              List
            </StyledLink>
            <StyledPlainButton
              data-testid="button-reset"
              type="reset"
              onClick={handleReset}
            >
              Reset
            </StyledPlainButton>
          </PageTitle>
          <LoadingWrapper
            error={error}
            isLoading={isLoading}
          >
            <StyledContainer>
              <FormContainer>
                <form
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <Input.Text
                    ref={inputTitleRef}
                    required
                    spellCheck
                    enterKeyHint="next"
                    label="Short Title"
                    autoCapitalize="off"
                    //errorTextShort="Please enter a short title"
                    inputMode="text"
                    // {...getStandardInputTextAttributes('name')}
                    //ref={focusElement}
                    {...getDefaultProps('name')}
                  />
                  <Input.Text
                    required
                    spellCheck
                    enterKeyHint="next"
                    label="Location"
                    autoCapitalize="off"
                    // errorTextShort="Please enter a location"
                    inputMode="text"
                    //ref={focusElement}
                    {...getDefaultProps('location')}
                  />
                  <Input.Text
                    required
                    spellCheck
                    enterKeyHint="next"
                    label="File Name"
                    autoCapitalize="off"
                    //   errorTextShort="Please enter a File Name"
                    inputMode="text"
                    {...getDefaultProps('fileName')}
                    //ref={focusElement}
                  />
                  <Input.Text
                    required
                    spellCheck
                    enterKeyHint="next"
                    label="SRC"
                    autoCapitalize="off"
                    //  errorTextShort="Please enter a image path"
                    inputMode="text"
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
                    spellCheck
                    enterKeyHint="next"
                    label="Official URL"
                    required={false}
                    autoCapitalize="off"
                    //    errorTextShort="Please enter a official URL"
                    inputMode="text"
                    {...getDefaultProps('official_url')}
                    //ref={focusElement}
                  />
                  <Input.Text
                    spellCheck
                    enterKeyHint="next"
                    label="Tags"
                    required={false}
                    autoCapitalize="off"
                    //  errorTextShort="Please enter a tag"
                    inputMode="text"
                    {...getDefaultProps('tags')}
                    //ref={focusElement}
                  />
                  <Input.TextArea
                    spellCheck
                    label="Description"
                    rows={30}
                    {...getDefaultProps('description')}
                    // required
                  />
                </form>
              </FormContainer>
              <ImageContainer>
                <ImageSelector
                  onSelectImage={(error_) => {
                    handleSelectImage(error_);
                  }}
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
