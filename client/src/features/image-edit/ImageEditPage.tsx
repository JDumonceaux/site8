import { type JSX, useEffect, useEffectEvent, useRef } from 'react';
import { useParams } from 'react-router-dom';

import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import Input from '@components/ui/input/Input';
import StyledLink from '@components/ui/link/styled-link/StyledLink';
import StyledPlainButton from '@components/ui/link/styled-plain-button/StyledPlainButton';
import FormSaveButton from '@components/ui/button/FormSaveButton';
import useSnackbar from '@features/app/snackbar/useSnackbar';
import { getSRC } from '@lib/utils/helpers';
import Layout from '@features/layouts/layout/Layout';
import useImageEdit from './useImageEdit';
import ImagePreview from './ImagePreview';
import styled from 'styled-components';
import type { ImageEdit } from '@site8/shared';

// Route constants
const ROUTES = {
  IMAGE_LIST: '/admin/images',
} as const;

// Helper to compute preview source
const getPreviewSrc = (formValues: ImageEdit): string => {
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
  const previewSrc = getPreviewSrc(formValues);

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
              type="button"
              onClick={handleClearForm}
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
              type="reset"
              onClick={resetForm}
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
                  id="image-edit-form"
                  action={formAction}
                  noValidate
                >
                  <Input.Text
                    ref={inputTitleRef}
                    disabled={isPending || isProcessing}
                    isRequired
                    spellCheck
                    enterKeyHint="next"
                    label="Name"
                    autoCapitalize="off"
                    inputMode="text"
                    {...getDefaultProps('name')}
                  />
                  <Input.Text
                    disabled={isPending || isProcessing}
                    isRequired={false}
                    spellCheck
                    enterKeyHint="next"
                    label="File Name"
                    autoCapitalize="off"
                    inputMode="text"
                    {...getDefaultProps('fileName')}
                  />
                  <Input.Text
                    disabled={isPending || isProcessing}
                    isRequired={false}
                    label="Folder"
                    {...getDefaultProps('folder')}
                  />
                  <Input.Text
                    disabled={isPending || isProcessing}
                    enterKeyHint="next"
                    label="External URL"
                    autoCapitalize="off"
                    inputMode="text"
                    {...getDefaultProps('ext_url')}
                  />
                  <Input.TextArea
                    disabled={isPending || isProcessing}
                    spellCheck
                    label="Description"
                    rows={10}
                    {...getDefaultProps('description')}
                  />
                </form>
              </FormContainer>
              <ImagePreview
                formValues={formValues}
                previewSrc={previewSrc}
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
