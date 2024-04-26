'use client';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TwoColumn } from 'components/ui/TwoColumn';
import usePageEdit from 'hooks/usePageEdit';
import { ModalProcessing } from 'components/common/ModalProcessing';

import { TextInput } from 'components/form/input';

import useSnackbar from 'hooks/useSnackbar';

import { TextArea } from 'components/form/input/TextArea';
import { Button } from 'components/form/Button';
import { styled } from 'styled-components';
import { Meta, PageTitle, StyledPlainButton, LoadingWrapper } from 'components';
import StyledLink from 'components/common/Link/StyledLink/StyledLink';
import StyledMain from 'components/common/StyledMain/StyledMain';

const ImageEditPage = (): JSX.Element => {
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
    handleCancel,
    handleChange,
    handleClear: onClear,
    handleReset,
    hasError,
    submitForm,
  } = usePageEdit(params.id);
  const { setSnackbarMessage } = useSnackbar();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setSnackbarMessage('Saving...');
      const result = submitForm();
      console.log('Result', result);
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

  const title = formValues.id ? `Edit Image ${formValues.id}` : 'New Image';

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <StyledMain.Section>
          <PageTitle title={title}>
            <StyledMenu>
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
                <StyledLink data-testid="nav-new" to="/admin/page/edit">
                  New
                </StyledLink>
              </li>
              <li>
                <StyledLink data-testid="nav-list" to="/admin/pages">
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
                errorText={getFieldErrors('url')}
                errorTextShort="Please enter a url"
                hasError={hasError('url')}
                id="url"
                inputMode="text"
                label="URL"
                onChange={handleChange}
                required={true}
                spellCheck={true}
                value={formValues.url}
                //ref={focusElement}
              />
              <TextInput
                errorText={getFieldErrors('parentId')}
                errorTextShort="Please enter a parent"
                hasError={hasError('parentId')}
                id="parentId"
                label="Parent"
                list="parentIds"
                onChange={handleChange}
                type="text"
                value={formValues.parentId}
              />
              <datalist id="parentIds">
                <option value="10">Art</option>
                <option value="3">Artists</option>
                <option value="5">Cheat Sheets</option>
                <option value="8">Code Solutions</option>
                <option value="1">CSS</option>
                <option value="2">Design Styles</option>
                <option value="4">General</option>
                <option value="11">IDE</option>
                <option value="12">JavaScript</option>
                <option value="6">React Programming</option>
                <option value="7">React Project</option>
                <option value="9">Patterns</option>
                <option value="13">Security</option>
              </datalist>

              <TextArea
                errorText={getFieldErrors('text')}
                hasError={hasError('text')}
                id="text"
                label="Text"
                onChange={handleChange}
                rows={30}
                spellCheck={true}
                value={formValues.text}
                // required={true}
              />
              <TextInput
                errorText={getFieldErrors('long_title')}
                errorTextShort="Please enter a title"
                hasError={hasError('long_title')}
                id="long_title"
                label="Long Title"
                onChange={handleChange}
                spellCheck={true}
                value={formValues.long_title}
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
              <TextInput
                errorText={getFieldErrors('reading_time')}
                hasError={hasError('reading_time')}
                id="reading_time"
                label="Reading Time"
                onChange={handleChange}
                value={formValues.reading_time}
              />
              <TextInput
                errorText={getFieldErrors('readability_score')}
                hasError={hasError('readability_score')}
                id="readability_score"
                label="Readability Score"
                onChange={handleChange}
                value={formValues.readability_score}
              />
              <TwoColumn includeGap includeMargin>
                <Button id="cancel" onClick={handleCancel} variant="secondary">
                  Cancel
                </Button>
                <Button id="submit" type="submit">
                  {isProcessing ? 'Processing' : 'Submit'}
                </Button>
              </TwoColumn>
            </form>
          </LoadingWrapper>
        </StyledMain.Section>
      </StyledMain>
      <ModalProcessing isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ImageEditPage;

const StyledMenu = styled.menu`
  display: inline-flex;
  list-style-type: none;
`;
