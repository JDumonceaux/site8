import { LoadingWrapper, Meta, PageTitle, StyledPlainButton } from 'components';
import StyledLink from 'components/common/Link/StyledLink/StyledLink';
import { ModalProcessing } from 'components/common/ModalProcessing';
import StyledMain from 'components/common/StyledMain/StyledMain';
import HTMLMenu from 'components/custom/PageEditPage/HTMLMenu';
import { TextInput } from 'components/form/input';
import { TextArea } from 'components/form/input/TextArea';
import useMenu from 'hooks/useMenu';
import usePageEdit from 'hooks/usePageEdit';
import useSnackbar from 'hooks/useSnackbar';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

const PageEditPage = (): JSX.Element => {
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { data } = useMenu();
  const {
    formValues,
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
  const [currPositionStart, setCurrPositionStart] = useState<number>(0);
  const [currPositionEnd, setCurrPositionEnd] = useState<number>(0);

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
    },
    [currentId, handleAction],
  );

  const parseString = useCallback(
    (value: string) => {
      const arr = value.split('\n');
      return arr.map((x) => '<li>' + x + '</li>').join('\n');
    },
    [],
  );

  const handleInsert = useCallback(
    (action: string) => {
      const textBefore = formValues.text.substring(0, currPositionStart);
      const textAfter = formValues.text.substring(currPositionEnd);
      const middle = formValues.text.substring(
        currPositionStart, currPositionEnd
  
      );    
      switch (action) {
        case 'ul':
          setFieldValue(
            'text',
            textBefore + '<ul>' + parseString(middle) + '</ul>' + textAfter,
          );
          break;
        case 'code':
          setFieldValue(
            'text',
            textBefore + '<pre><code>' + middle + '\n</code></pre>' + textAfter,
          );
          break;
        case 'h2': 
          setFieldValue(
            'text',
            textBefore + '<h2>' + middle + '</h2>\n' + textAfter,
          );
          break;
        case 'link':
          setFieldValue(
            'text',
            textBefore + '<a href="">' + middle + '</a>\n' + textAfter,
          );
          break;
        default:
          break;
      }
    },
    [currPositionStart, currPositionEnd, formValues.text, setFieldValue, parseString],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (validateForm()) {
        setSnackbarMessage('Saving...');
        startTransition(() => {
          handleSave();
        });
      }
    },
    [validateForm, setSnackbarMessage, handleSave],
  );

  useEffect(() => {
    setSnackbarMessage(!error ? 'Saved' : 'Error');
  }, [error, setSnackbarMessage]);

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

  const handeTextAreaBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setCurrPositionStart(e.currentTarget.selectionStart);
      setCurrPositionEnd(e.currentTarget.selectionEnd);
    },
    [setCurrPositionStart, setCurrPositionEnd],
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
            <button
              data-testid="nav-first"
              onClick={() => handleOnClick('first')}
              type="button">
              First
            </button>
            <button
              data-testid="nav-prev"
              onClick={() => handleOnClick('prev')}
              type="button">
              Prev
            </button>
            <button
              data-testid="nav-next"
              onClick={() => handleOnClick('next')}
              type="button">
              Next
            </button>
            <button
              data-testid="nav-last"
              onClick={() => handleOnClick('last')}
              type="button">
              Last
            </button>
            <div>
              <StyledLink data-testid="nav-new" to="/admin/page/edit">
                New
              </StyledLink>
            </div>
            <div>
              <StyledLink data-testid="nav-list" to="/admin/pages">
                List
              </StyledLink>
            </div>
            <StyledPlainButton
              data-testid="button-reset"
              onClick={handleReset}
              type="reset">
              Undo
            </StyledPlainButton>
            <StyledPlainButton
              data-testid="button-clear"
              onClick={handleClear}
              type="reset">
              Clear
            </StyledPlainButton>
            {!isSaved ? (
              <StyledSaveButton
                data-testid="button-save"
                onClick={handleSubmit}
                type="submit">
                {isPending ? 'Saving' : 'Save'}
              </StyledSaveButton>
            ) : null}
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
                onChange={handleChange}
                type="text"
                value={formValues.parent}
              />
              <StyledLine>
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
                <HTMLMenu onClick={handleInsert}/>
                </StyledLine>
              <TextArea
                errorText={getFieldErrors('text')}
                hasError={hasError('text')}
                id="text"
                label="Text"
                onBlur={handeTextAreaBlur}
                onChange={handleChange}
                rows={30}
                spellCheck={true}
                value={formValues.text}
                // required={true}
              />
              <TextInput
                errorText={getFieldErrors('reading_time')}
                hasError={hasError('reading_time')}
                id="reading_time"
                label="Reading Time"
                layout="horizontal"
                onChange={handleChange}
                value={formValues.reading_time}
              />
              <TextInput
                errorText={getFieldErrors('readability_score')}
                hasError={hasError('readability_score')}
                id="readability_score"
                label="Readability Score"
                layout="horizontal"
                onChange={handleChange}
                value={formValues.readability_score}
              />
            </form>
          </LoadingWrapper>
        </StyledMain.Section>
      </StyledMain>
      <ModalProcessing isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default PageEditPage;

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
const StyledLine = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: left;
  button {
    margin-left: 10px;
  }
`;
