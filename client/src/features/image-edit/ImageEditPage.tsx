import { type JSX, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import LoadingWrapper from '@components/core/loading-temp/LoadingWrapper';
import Meta from '@components/core/meta-temp/Meta';
import PageTitle from '@components/core/page-title/PageTitle';
import ImageSelector from '@components/custom/image-selector/ImageSelector';
import Input from '@components/input-temp/Input';
import StyledLink from '@components/link/styled-link/StyledLink';
import StyledPlainButton from '@components/link/styled-plain-button/StyledPlainButton';
import useSnackbar from '@features/app/snackbar-temp/useSnackbar';
import Layout from '@features/layouts/layout-temp/Layout';
import type { Image } from '@shared/types';
import useImageEdit from './useImageEdit';
import styled from 'styled-components';

const ImageEditPage = (): JSX.Element => {
  const parameters = useParams();
  const { id } = parameters as { id: string };
  const {
    formValues,
    getDefaultProps,
    isProcessing,
    isSaved,
    resetForm,
    saveItem,
  } = useImageEdit(id);

  const { setMessage } = useSnackbar();

  const handleSubmit = (event: React.FormEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setMessage('Saving...');
    void (async () => {
      const success = await saveItem();
      if (success) {
        setMessage('Saved successfully');
      }
    })();
  };

  const handleSelectImage = (item: Image | undefined) => {
    if (item) {
      setMessage(`Image selected: ${item.title ?? item.fileName ?? 'Unknown'}`);
    }
  };

  const title = formValues.id ? `Edit Image ${formValues.id}` : 'New Image';

  const inputTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputTitleRef.current?.focus();
  }, []);

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
              onClick={resetForm}
            >
              Reset
            </StyledPlainButton>
          </PageTitle>
          <LoadingWrapper isLoading={isProcessing}>
            <StyledContainer>
              <FormContainer>
                <form
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <Input.Text
                    ref={inputTitleRef}
                    isRequired
                    spellCheck
                    enterKeyHint="next"
                    label="Short Title"
                    autoCapitalize="off"
                    inputMode="text"
                    {...getDefaultProps('name')}
                  />
                  <Input.Text
                    isRequired
                    spellCheck
                    enterKeyHint="next"
                    label="Location"
                    autoCapitalize="off"
                    inputMode="text"
                    {...getDefaultProps('location')}
                  />
                  <Input.Text
                    isRequired
                    spellCheck
                    enterKeyHint="next"
                    label="File Name"
                    autoCapitalize="off"
                    inputMode="text"
                    {...getDefaultProps('fileName')}
                  />
                  <Input.Text
                    isRequired
                    spellCheck
                    enterKeyHint="next"
                    label="SRC"
                    autoCapitalize="off"
                    inputMode="text"
                    {...getDefaultProps('src')}
                  />
                  <Input.Text
                    isRequired={false}
                    label="Folder"
                    {...getDefaultProps('folder')}
                  />
                  <Input.Text
                    spellCheck
                    enterKeyHint="next"
                    isRequired={false}
                    label="Official URL"
                    autoCapitalize="off"
                    inputMode="url"
                    {...getDefaultProps('official_url')}
                  />
                  <Input.Text
                    spellCheck
                    enterKeyHint="next"
                    isRequired={false}
                    label="Tags"
                    autoCapitalize="off"
                    inputMode="text"
                    {...getDefaultProps('tags')}
                  />
                  <Input.TextArea
                    spellCheck
                    label="Description"
                    rows={30}
                    {...getDefaultProps('description')}
                  />
                </form>
              </FormContainer>
              <ImageContainer>
                <ImageSelector onSelectImage={handleSelectImage} />
              </ImageContainer>
            </StyledContainer>
          </LoadingWrapper>
        </Layout.Section>
      </Layout.Main>
    </>
  );
};

export default ImageEditPage;

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
