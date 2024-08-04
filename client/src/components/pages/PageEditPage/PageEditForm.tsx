import * as Form from '@radix-ui/react-form';
import InputText from 'components/ui/Input/InputText/InputText';

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
      getStandardInputTextAttributes,
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
          {...getStandardInputTextAttributes('name')}
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

          //layout="horizontal"
          //onBlur={handeNameOnBlur}
          //required
          //spellCheck
        />

        <InputText
          {...getStandardInputTextAttributes('to')}
          label="To"
          placeholder="Enter a Route"
        />
        <InputText
          {...getStandardInputTextAttributes('url')}
          label="URL"
          onChange={handleChange}
          placeholder="Enter a URL"
        />
        <InputText
          {...getStandardInputTextAttributes('parent')}
          label="Parent"
          placeholder="Enter a menu id"
        />
        <ToolMenu onClick={handeTextInsert} />
        {/* <TextArea
          {...getStandardInputTextAttributes('text')}
          label="Text"
          onBlur={handeTextAreaBlur}
          rows={30}
          spellCheck
        /> */}
        <InputText
          {...getStandardInputTextAttributes('reading_time')}
          errorText={getFieldErrors('reading_time')}
          label="Reading Time"
        />
        <InputText
          {...getStandardInputTextAttributes('text')}
          label="Readability Score"
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
