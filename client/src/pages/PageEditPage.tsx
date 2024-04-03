import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from 'components/ui/Form/Button';

import { TwoColumn } from 'components/ui/TwoColumn';
import usePageEdit from 'services/hooks/usePageEdit';
import { ModalProcessing } from 'components/common/ModalProcessing';
import { ClearAll } from 'components/ui/Form/ClearAll';
import { Meta } from 'components/common/Meta';
import { TextInput } from 'components/ui/Form/Input';
import { TextArea } from 'components/ui/Form/Input/TextArea';
import { LoadingWrapper } from 'components';
import StyledMain from 'components/common/StyledMain';
import useSnackbar from 'services/hooks/useSnackbar';
import { StyledLink } from 'components/ui/Form/StyledLink';
import { StyledPlainButton } from 'components/ui/Form/StyledPlainButton/StyledPlainButton';

const PageEditPage = (): JSX.Element => {
  const params = useParams();
  // const [showErrorOverlay, setShowErrorOverlay] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    formValues,
    isProcessing,
    isLoading,
    error,
    getFieldErrors,
    handleCancel,
    handleChange,
    handleClear,
    handleReset,
    hasError,
    submitForm,
  } = usePageEdit(params.id);
  const { setSnackbarMessage } = useSnackbar();

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

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

  return (
    <>
      <Meta title="Page Edit" />

      <LoadingWrapper error={error} isLoading={isLoading}>
        <StyledMain>
          <StyledMain.Section>
            <ClearAll onClear={handleClear} title="Page Edit">
              <StyledLink data-testid="nav-new" to="/admin/page/edit">
                New
              </StyledLink>
              <StyledLink data-testid="nav-list" to="/admin/pages">
                List
              </StyledLink>
              <StyledPlainButton
                data-testid="button-reset"
                onClick={handleReset}
                type="reset">
                Reset
              </StyledPlainButton>
            </ClearAll>
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
              <TextArea
                errorText={getFieldErrors('text')}
                hasError={hasError('text')}
                id="text"
                label="Text"
                onChange={handleChange}
                rows={30}
                showCounter
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
                errorText={getFieldErrors('edit_date_display')}
                errorTextShort="Please enter a date"
                hasError={hasError('edit_date_display')}
                id="edit_date_display"
                label="Edit Date"
                maxLength={10}
                onChange={handleChange}
                showCounter
                spellCheck={false}
                value={formValues.edit_date_display}

                // required={true}
              />

              <TextInput
                errorText={getFieldErrors('parentId')}
                errorTextShort="Please enter a parent"
                hasError={hasError('parentId')}
                id="parentId"
                label="Parent"
                list="parentIds"
                onChange={handleChange}
                showCounter
                type="text"
                value={formValues.parentId}
              />
              <datalist id="parentIds">
                <option value="1">CSS</option>
                <option value="2">Design Styles</option>
                <option value="3">Artists</option>
                <option value="4">General</option>
                <option value="5">Cheat Sheets</option>
                <option value="6">React Programming</option>
                <option value="7">React Project</option>
                <option value="8">Unknown</option>
              </datalist>
              <TextInput
                errorText={getFieldErrors('reading_time')}
                hasError={hasError('reading_time')}
                id="reading_time"
                label="Reading Time"
                onChange={handleChange}
                showCounter
                value={formValues.reading_time}
              />
              <TextInput
                errorText={getFieldErrors('readability_score')}
                hasError={hasError('readability_score')}
                id="readability_score"
                label="Readability Score"
                onChange={handleChange}
                showCounter
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
          </StyledMain.Section>
        </StyledMain>
      </LoadingWrapper>
      <ModalProcessing isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default PageEditPage;
