import { type JSX, useEffect, useEffectEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';

import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import Input from '@components/ui/input/Input';
import StyledLink from '@components/ui/link/styled-link/StyledLink';
import StyledPlainButton from '@components/ui/link/styled-plain-button/StyledPlainButton';
import useSnackbar from '@features/app/snackbar/useSnackbar';
import { getSRC } from '@lib/utils/helpers';
import Layout from '@features/layouts/layout/Layout';
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

  const title = formValues.id ? `Edit Image ${formValues.id}` : 'New Image';

  const previewSrc =
    (formValues.url && formValues.url.trim()) ||
    (formValues.fileName
      ? getSRC(formValues.folder ?? '', formValues.fileName ?? '')
      : '');

  const inputTitleRef = useRef<HTMLInputElement>(null);
  const focusInputEvent = useEffectEvent(() => {
    inputTitleRef.current?.focus();
  });

  useEffect(() => {
    focusInputEvent();
  }, []);

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <Layout.Section>
          <PageTitle title={title}>
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
            <StyledPlainButton
              data-testid="button-save-bottom"
              disabled={isSaved}
              type="submit"
              onClick={handleSubmit}
            >
              Save
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
                    label="Name"
                    autoCapitalize="off"
                    inputMode="text"
                    {...getDefaultProps('name')}
                  />
                  <Input.Text
                    isRequired={false}
                    spellCheck
                    enterKeyHint="next"
                    label="File Name"
                    autoCapitalize="off"
                    inputMode="text"
                    {...getDefaultProps('fileName')}
                  />
                  <Input.Text
                    isRequired={false}
                    label="Folder"
                    {...getDefaultProps('folder')}
                  />
                  <Input.Text
                    enterKeyHint="next"
                    label="URL"
                    autoCapitalize="off"
                    inputMode="text"
                    {...getDefaultProps('url')}
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
                    rows={10}
                    {...getDefaultProps('description')}
                  />
                </form>
              </FormContainer>
              <ImageContainer>
                {previewSrc ? (
                  <StyledImageDisplay>
                    <StyledImage
                      alt={
                        formValues.name ||
                        formValues.fileName ||
                        'Image preview'
                      }
                      src={previewSrc}
                    />
                    <StyledImageInfo>
                      {formValues.name && <h3>{formValues.name}</h3>}
                      {formValues.folder && <p>Folder: {formValues.folder}</p>}
                      {formValues.fileName && (
                        <p>File: {formValues.fileName}</p>
                      )}
                    </StyledImageInfo>
                  </StyledImageDisplay>
                ) : (
                  <StyledPlaceholder>No image to display</StyledPlaceholder>
                )}
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
  position: sticky;
  top: 100px;
  align-self: flex-start;
`;
const FormContainer = styled.div`
  flex-basis: 70%;
`;

const StyledImageDisplay = styled.div`
  border: 1px solid var(--border-light, #e0e0e0);
  border-radius: 8px;
  overflow: hidden;
  background: var(--surface-background-color);
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const StyledImageInfo = styled.div`
  padding: 1rem;
  h3 {
    margin: 0 0 0.75rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary-color);
  }
  p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    color: var(--text-secondary-color);
  }
`;

const StyledPlaceholder = styled.div`
  padding: 2rem;
  text-align: center;
  color: var(--text-tertiary-color);
  border: 1px dashed var(--border-light, #e0e0e0);
  border-radius: 8px;
`;
