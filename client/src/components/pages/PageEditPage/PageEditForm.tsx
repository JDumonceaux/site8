import StyledPlainButton from 'components/common/Link/StyledPlainButton/StyledPlainButton';
import { TextInput } from 'components/form/input';
import { TextArea } from 'components/form/input/TextArea';
import usePageEdit from 'hooks/usePageEdit';
import { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { Page } from 'types';
import { insertHTML } from './textUtils';
import ToolMenu from './ToolMenu';

type PageEditFormProps = {
  readonly data?: Page;
};

const PageEditForm = ({ data }: PageEditFormProps): JSX.Element => {
  const {
    formValues,
    getFieldErrors,
    getStandardTextInputAttributes,
    handleChange,
    handleSave,
    setFieldValue,
    isSaved,
  } = usePageEdit(data);

  const [currPositionStart, setCurrPositionStart] = useState<number>(0);
  const [currPositionEnd, setCurrPositionEnd] = useState<number>(0);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.stopPropagation();
      e.preventDefault();
      handleSave();
    },
    [handleSave],
  );

  const handeTextInsert = useCallback(
    (action: string) => {
      const result = insertHTML(
        formValues.text,
        currPositionStart,
        currPositionEnd,
        action,
      );
      setFieldValue('text', result);
    },
    [formValues.text, currPositionStart, currPositionEnd, setFieldValue],
  );

  const handeNameOnBlur = useCallback(() => {
    if (formValues.name.length > 0 && formValues.to?.length === 0) {
      const x = formValues.name.toLowerCase().replaceAll(' ', '-');
      setFieldValue('to', x);
    }
  }, [formValues.name, formValues.to?.length, setFieldValue]);

  const handeTextAreaBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setCurrPositionStart(e.currentTarget.selectionStart);
      setCurrPositionEnd(e.currentTarget.selectionEnd);
    },
    [setCurrPositionStart, setCurrPositionEnd],
  );

  return (
    <form noValidate onSubmit={handleSubmit}>
      <StyledButton>
        <StyledSaveButton
          data-testid="button-save"
          onClick={handleSubmit}
          type="submit">
          {isSaved ? 'Saved' : 'Save'}
        </StyledSaveButton>
      </StyledButton>
      <TextInput
        {...getStandardTextInputAttributes('name')}
        label="Short Title"
        layout="horizontal"
        onBlur={handeNameOnBlur}
        required
        spellCheck
      />
      <TextInput
        {...getStandardTextInputAttributes('to')}
        label="To"
        layout="horizontal"
        required
        spellCheck
      />
      <TextInput
        {...getStandardTextInputAttributes('url')}
        label="URL"
        layout="horizontal"
        onChange={handleChange}
        required
        spellCheck
      />
      <TextInput
        {...getStandardTextInputAttributes('parent')}
        label="Parent"
        layout="horizontal"
      />
      <ToolMenu onClick={handeTextInsert} />
      <TextArea
        {...getStandardTextInputAttributes('text')}
        label="Text"
        onBlur={handeTextAreaBlur}
        rows={30}
        spellCheck
      />
      <TextInput
        {...getStandardTextInputAttributes('reading_time')}
        errorText={getFieldErrors('reading_time')}
        label="Reading Time"
        layout="horizontal"
      />
      <TextInput
        {...getStandardTextInputAttributes('text')}
        label="Readability Score"
        layout="horizontal"
      />
    </form>
  );
};

export default PageEditForm;

const StyledSaveButton = styled(StyledPlainButton)`
  font-weight: 400;
`;
const StyledButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;
