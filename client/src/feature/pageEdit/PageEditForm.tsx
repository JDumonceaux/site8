import React, { forwardRef, useCallback, useState } from 'react';

import * as Form from '@radix-ui/react-form';
import Input from 'components/Input/Input';
import { TextArea } from 'components/Input/TextArea/TextArea';
import StyledPlainButton from 'components/Link/StyledPlainButton/StyledPlainButton';
import usePageEdit from 'feature/pageEdit/usePageEdit';
import { styled } from 'styled-components';
import type { Page } from 'types/Page';

import { insertHTML } from './textUtils';
import ToolMenu from './ToolMenu';

type PageEditFormProps = {
  readonly data?: Page;
};

const PageEditForm = forwardRef<HTMLFormElement, PageEditFormProps>(
  ({ data }, reference): React.JSX.Element => {
    const {
      formValues,
      getDefaultProps,
      handleChange,
      handleSave,
      isSaved,
      setFieldValue,
    } = usePageEdit(data);

    const [currentPositionStart, setCurrentPositionStart] = useState<number>(0);
    const [currentPositionEnd, setCurrentPositionEnd] = useState<number>(0);

    const handleSubmit = useCallback(
      (error: React.FormEvent) => {
        error.stopPropagation();
        error.preventDefault();
        handleSave();
      },
      [handleSave],
    );

    const handeTextInsert = useCallback(
      (action: string) => {
        const result = insertHTML(
          formValues.text,
          currentPositionStart,
          currentPositionEnd,
          action,
        );
        setFieldValue('text', result);
      },
      [
        formValues.text,
        currentPositionStart,
        currentPositionEnd,
        setFieldValue,
      ],
    );

    const handeNameOnBlur = useCallback(() => {
      if (formValues.name.length > 0 && formValues.to?.length === 0) {
        const x = formValues.name.toLowerCase().replaceAll(' ', '-');
        setFieldValue('to', x);
      }
    }, [formValues.name, formValues.to?.length, setFieldValue]);

    const handeTextAreaBlur = useCallback(
      (error: React.FocusEvent<HTMLTextAreaElement>) => {
        setCurrentPositionStart(error.currentTarget.selectionStart);
        setCurrentPositionEnd(error.currentTarget.selectionEnd);
      },
      [setCurrentPositionStart, setCurrentPositionEnd],
    );

    return (
      <Form.Root onSubmit={handleSubmit} ref={reference}>
        <StyledButton>
          <StyledSaveButton
            data-testid="button-save"
            onClick={handleSubmit}
            type="submit">
            {isSaved ? 'Saved' : 'Save'}
          </StyledSaveButton>
        </StyledButton>
        <Input.Text
          {...getDefaultProps('name')}
          // errorText={getFieldErrors('name')}
          id="name"
          label="Title"
          minLength={10}
          onBlur={handeNameOnBlur}
          onChange={handleChange}
          placeholder="Enter a title"
          required
          spellCheck
          value={formValues.name}

          //layout="horizontal"
          //onBlur={handeNameOnBlur}
          //required
          //spellCheck
        />

        <Input.Text
          {...getDefaultProps('to')}
          label="To"
          placeholder="Enter a route"
        />
        <Input.Text
          {...getDefaultProps('url')}
          label="URL"
          onChange={handleChange}
          placeholder="Enter a url"
        />
        <Input.Text
          {...getDefaultProps('parent')}
          label="Parent"
          placeholder="Enter a menu id"
        />
        <ToolMenu onClick={handeTextInsert} />
        <TextArea
          {...getDefaultProps('text')}
          label="Text"
          //  onBlur={handeTextAreaBlur}
          rows={30}
          spellCheck
        />
        <Input.Text
          {...getDefaultProps('reading_time')}
          // errorText={getFieldErrors('reading_time')}
          label="Reading Time"
        />
        <Input.Text
          {...getDefaultProps('readability_score')}
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
