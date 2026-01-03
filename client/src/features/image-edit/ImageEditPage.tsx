import { type JSX, useEffect, useEffectEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';

import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import FormSaveButton from '@components/ui/button/FormSaveButton';
import Input from '@components/ui/input/Input';
import StyledLink from '@components/ui/link/styled-link/StyledLink';
import StyledPlainButton from '@components/ui/link/styled-plain-button/StyledPlainButton';
import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import useSnackbar from '@features/app/snackbar/useSnackbar';
import Layout from '@features/layouts/layout/Layout';
import { getSRC } from '@lib/utils/helpers';
import type { ImageEdit } from '@site8/shared';
import ImagePreview from './ImagePreview';
import useImageEdit from './useImageEdit';
import styled from 'styled-components';

// Route constants
const ROUTES = {
  IMAGE_LIST: '/admin/images',
} as const;

// Helper to compute preview source
const getPreviewSource = (formValues: ImageEdit): string => {
  if (formValues.ext_url?.trim()) {
    return formValues.ext_url.trim();
  }
  const result = getSRC(formValues.folder, formValues.fileName);
  return result || '';
};

const ImageEditPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const {
    actionState,
    clearForm,
    formAction,
    formValues,
    getDefaultProps,
    isPending,
    isProcessing,
    isSaved,
    resetForm,
  } = useImageEdit(id ?? null);

  const { setMessage } = useSnackbar();

  // Show snackbar messages from action state
  useEffect(() => {
    if (actionState.message) {
      setMessage(actionState.message);
    }
  }, [actionState.message, setMessage]);

  const handleClearForm = () => {
    clearForm();
    inputTitleRef.current?.focus();
  };

  const title = formValues.id ? `Edit Image ${formValues.id}` : 'New Image';
  const previewSource = getPreviewSource(formValues);

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
            <StyledPlainButton
              data-testid="button-clear"
              disabled={isPending || isProcessing}
              onClick={handleClearForm}
              type="button"
            >
              Clear
            </StyledPlainButton>
            <StyledLink
              data-testid="nav-list"
              to={ROUTES.IMAGE_LIST}
            >
              List
            </StyledLink>
            <StyledPlainButton
              data-testid="button-reset"
              disabled={isSaved || isPending || isProcessing}
              onClick={resetForm}
              type="reset"
            >
              Reset
            </StyledPlainButton>
            <FormSaveButton
              data-testid="button-save"
              disabled={isSaved}
              form="image-edit-form"
            >
              Save
            </FormSaveButton>
          </PageTitle>
          <LoadingWrapper isLoading={isProcessing}>
            <StyledContainer>
              <FormContainer>
                <form
                  action={formAction}
                  id="image-edit-form"
                  noValidate
                >
                  <Input.Text
                    autoCapitalize="off"
                    disabled={isPending || isProcessing}
                    enterKeyHint="next"
                    inputMode="text"
                    isRequired
                    label="Name"
                    ref={inputTitleRef}
                    spellCheck
                    {...getDefaultProps('name')}
                  />
                  <Input.Text
                    autoCapitalize="off"
                    disabled={isPending || isProcessing}
                    enterKeyHint="next"
                    inputMode="text"
                    label="File Name"
                    spellCheck
                    {...getDefaultProps('fileName')}
                  />
                  <Input.Text
                    disabled={isPending || isProcessing}
                    label="Folder"
                    {...getDefaultProps('folder')}
                  />
                  <Input.Text
                    autoCapitalize="off"
                    disabled={isPending || isProcessing}
                    enterKeyHint="next"
                    inputMode="text"
                    label="External URL"
                    {...getDefaultProps('ext_url')}
                  />
                  <Input.TextArea
                    disabled={isPending || isProcessing}
                    label="Description"
                    rows={10}
                    spellCheck
                    {...getDefaultProps('description')}
                  />
                </form>
              </FormContainer>
              <ImagePreview
                formValues={formValues}
                previewSrc={previewSource}
              />
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

const FormContainer = styled.div`
  flex-basis: 70%;
`;
