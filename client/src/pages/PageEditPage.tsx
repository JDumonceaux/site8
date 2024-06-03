'use client';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { useParams } from 'react-router-dom';
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
import useMenu from 'hooks/useMenu';

const PageEditPage = (): JSX.Element => {
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { data } = useMenu();
  const {
    formValues,
    isProcessing,
    isLoading,
    error,
    isSaved,
    getFieldErrors,
    handleAction,
    handleChange,
    handleReset,
    handleClear: onClear,
    hasError,
    handleSave,
    fetchItem,
    setFieldValue,
    validateForm,
  } = usePageEdit();
  // Current Item
  const [currentId, setCurrentId] = useState<number>(0);

  const { setSnackbarMessage } = useSnackbar();

  // Set the id from the parameters if present
  useEffect(() => {
    const value = params.id;
    if (value) {
      const tempId = parseInt(value ?? '');
      if (!isNaN(tempId) && tempId > 0) {
        setCurrentId(tempId);
      }
    }
  }, [params.id]);

  useEffect(() => {
    if (currentId && currentId > 0) {
      fetchItem(currentId);
    }
  }, [currentId, fetchItem]);

  const handleOnClick = useCallback(
    (action: string) => {
      handleAction(currentId, action);
      // navigation(`/admin/page/edit/${action}`);
    },
    [currentId, handleAction],
  );

  const handleInsert = useCallback(
    (action: string) => {
      if (action === 'code') {
        setFieldValue(
          'text',
          formValues.text + '<pre><code>\n\n</code></pre>\n',
        );
      }
    },
    [formValues.text, setFieldValue],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (validateForm()) {
        setSnackbarMessage('Saving...');
        startTransition(() => {
          handleSave();
          setSnackbarMessage('Saved');
        });
      }
    },
    [validateForm, setSnackbarMessage, handleSave],
  );

  const handeOnBlur = useCallback(() => {
    if (formValues.name.length > 0 && formValues.to?.length === 0) {
      const x = formValues.name.toLowerCase().replaceAll(' ', '-');
      setFieldValue('to', x);
    }
  }, [formValues.name, formValues.to?.length, setFieldValue]);

  const handleClear = useCallback(
    (e: React.FormEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onClear();
    },
    [onClear],
  );

  const title = formValues.id ? `Edit Page ${formValues.id}` : 'New Page';

  const menuItems =
    data?.items?.filter((x) => x.type === 'menu' || x.type === 'root') ?? [];

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <StyledMain.Section>
          <PageTitle title={title}>
            <StyledMenu>
              <li>
                <button
                  data-testid="nav-first"
                  onClick={() => handleOnClick('first')}
                  type="button">
                  First
                </button>
              </li>
              <li>
                <button
                  data-testid="nav-prev"
                  onClick={() => handleOnClick('prev')}
                  type="button">
                  Prev
                </button>
              </li>
              <li>
                <button
                  data-testid="nav-next"
                  onClick={() => handleOnClick('next')}
                  type="button">
                  Next
                </button>
              </li>
              <li>
                <button
                  data-testid="nav-last"
                  onClick={() => handleOnClick('last')}
                  type="button">
                  Last
                </button>
              </li>

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
                  Undo
                </StyledPlainButton>
              </li>
              <li>
                <StyledPlainButton
                  data-testid="button-clear"
                  onClick={handleClear}
                  type="reset">
                  Clear
                </StyledPlainButton>
              </li>
              {!isSaved ? (
                <li>
                  <StyledSaveButton
                    data-testid="button-save"
                    onClick={handleSubmit}
                    type="submit">
                    Save
                  </StyledSaveButton>
                </li>
              ) : null}
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
                layout="horizontal"
                onBlur={handeOnBlur}
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
                errorText={getFieldErrors('to')}
                errorTextShort="Please enter a route"
                hasError={hasError('to')}
                id="to"
                inputMode="text"
                label="To"
                layout="horizontal"
                onChange={handleChange}
                required={true}
                spellCheck={true}
                value={formValues.to}
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
                layout="horizontal"
                onChange={handleChange}
                required={true}
                spellCheck={true}
                value={formValues.url}
                //ref={focusElement}
              />
              <TextInput
                errorText={getFieldErrors('parent')}
                errorTextShort="Please enter a parent"
                hasError={hasError('parent')}
                id="parent"
                label="Parent"
                layout="horizontal"
                list="parentIds"
                onChange={handleChange}
                type="text"
                value={formValues.parent}
              />
              <Field>
                <label htmlFor="options">Menu</label>

                <select>
                  <option value="">Select a menu</option>
                  {menuItems.map((value) => (
                    <option key={value.id} value={value.id}>
                      {value.name} - {value.id}
                    </option>
                  ))}
                </select>
              </Field>
              <datalist id="parentOptions" />

              <StyledMenu>
                <li>
                  <button
                    data-testid="insert-code"
                    onClick={() => handleInsert('code')}
                    type="button">
                    Code
                  </button>
                </li>
                {/* <li>
                <button
                  data-testid="nav-prev"
                  onClick={() => handleOnClick('prev')}
                  type="button">
                  Prev
                </button>
                </li> */}
              </StyledMenu>

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

              <Button disabled={isPending} id="submit" type="submit">
                {isProcessing ? 'Processing' : 'Submit'}
              </Button>
            </form>
          </LoadingWrapper>
        </StyledMain.Section>
      </StyledMain>
      <ModalProcessing isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default PageEditPage;

const StyledMenu = styled.menu`
  display: inline-flex;
  list-style-type: none;
`;
const Field = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: 20px;
  select {
    border: 1px solid #ccc;
    margin-left: 20px;
   
    padding: 6px; 12px;
  }
`;
const StyledSaveButton = styled(StyledPlainButton)`
  font-weight: bold;
`;
