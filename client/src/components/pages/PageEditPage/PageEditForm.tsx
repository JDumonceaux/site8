import * as Form from '@radix-ui/react-form';
import InputText from 'components/ui/Input/InputText/InputText';
import { TextArea } from 'components/ui/Input/TextArea';
import TextInput from 'components/ui/Input/TextInput/TextInput';
import StyledPlainButton from 'components/ui/Link/StyledPlainButton/StyledPlainButton';
import usePageEdit from 'hooks/usePageEdit';
import { forwardRef, useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { Page } from 'types';
import { insertHTML } from './textUtils';
import ToolMenu from './ToolMenu';

type PageEditFormProps = {
  readonly data?: Page;
};

const PageEditForm = forwardRef<HTMLFormElement, PageEditFormProps>(
  ({ data }, ref): JSX.Element => {
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
      <Form.Root onSubmit={handleSubmit} ref={ref}>
        <StyledButton>
          <StyledSaveButton
            data-testid="button-save"
            onClick={handleSubmit}
            type="submit">
            {isSaved ? 'Saved' : 'Save'}
          </StyledSaveButton>
        </StyledButton>
        <InputText
          {...getStandardTextInputAttributes('name')}
          errorText={getFieldErrors('name')}
          id="name"
          label="Title"
          minLength={10}
          onBlur={handeNameOnBlur}
          onChange={handleChange}
          placeholder="Enter a title"
          required
          spellCheck
          value={formValues['name']}

          //hasError={hasError('name')}
          //layout="horizontal"
          //onBlur={handeNameOnBlur}
          //required
          //spellCheck
        />
        {/* <TextInput
          {...getStandardTextInputAttributes('name')}
          label="Short Title"
          layout="horizontal"
          onBlur={handeNameOnBlur}
          required
          spellCheck
        /> */}
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
      </Form.Root>
    );
  },
);

PageEditForm.displayName = 'PageEditForm';

export default PageEditForm;

const StyledSaveButton = styled(StyledPlainButton)`
  font-weight: 400;
`;
const StyledButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;
