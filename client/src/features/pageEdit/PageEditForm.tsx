import React, { useActionState, useCallback, useState } from 'react';

import * as Form from '@radix-ui/react-form';
import Input from 'components/Input/Input';
import StyledPlainButton from 'components/Link/StyledPlainButton/StyledPlainButton';
import usePageEdit from 'features/pageEdit/usePageEdit';
import styled from 'styled-components';
import type { Page, PageEdit } from 'types/Page';

import { insertHTML } from './textUtils';
import ToolMenu from './ToolMenu';
import usePagePatch from './usePagePatch';

type PageEditFormProps = {
  readonly data?: null | Page;
};

const PageEditForm = (): React.JSX.Element => {
  // const {
  //   formValues,
  //   getDefaultProps,
  //   handleChange,
  //   handleSave,
  //   isSaved,
  //   setFieldValue,
  // } = usePageEdit(data);

  // const [currentPositionStart, setCurrentPositionStart] = useState<number>(0);
  // const [currentPositionEnd, setCurrentPositionEnd] = useState<number>(0);

  // const handleSubmit = useCallback(
  //   (error: React.FormEvent) => {
  //     error.stopPropagation();
  //     error.preventDefault();
  //     handleSave();
  //   },
  //   [handleSave],
  // );

  // const handeTextInsert = useCallback(
  //   (action: string) => {
  //     const result = insertHTML(
  //       formValues.text,
  //       currentPositionStart,
  //       currentPositionEnd,
  //       action,
  //     );
  //     setFieldValue('text', result);
  //   },
  //   [formValues.text, currentPositionStart, currentPositionEnd, setFieldValue],
  // );

  // const handeNameOnBlur = useCallback(() => {
  //   if (formValues.name.length > 0 && formValues.to?.length === 0) {
  //     const x = formValues.name.toLowerCase().replaceAll(' ', '-');
  //     setFieldValue('to', x);
  //   }
  // }, [formValues.name, formValues.to?.length, setFieldValue]);

  // const handeTextAreaBlur = useCallback(
  //   (error: React.FocusEvent<HTMLTextAreaElement>) => {
  //     setCurrentPositionStart(error.currentTarget.selectionStart);
  //     setCurrentPositionEnd(error.currentTarget.selectionEnd);
  //   },
  //   [setCurrentPositionStart, setCurrentPositionEnd],
  // );

  const [data, action, isPending] = useActionState(saveUser, {
    message: 'Stuck up',
    fieldData: { feedback: 'Test' },
  });

  async function saveUser(prevState: unknown, formData: FormData) {
    await 1000;
    console.log('feedback', formData.get('feedback') as string);
    return {
      message: 'error',
      fieldData: { feedback: formData.get('feedback') as string },
    };
  }

  const isSaved = false;

  return (
    <form action={action}>
      <StyledButton>
        <StyledSaveButton
          data-testid="button-save"
          //onClick={handleSubmit}
          type="submit">
          {isSaved ? 'Saved' : 'Save'}
        </StyledSaveButton>
      </StyledButton>
      <button type="submit">Submit</button>
      <div>{data?.message}</div>
      <div>
        p
        <input
          name="feedback"
          placeholder="input"
          type="text"
          defaultValue={data?.fieldData?.feedback}
        />
        p
      </div>
      <Input.Text
        id="title"
        labelProps={{ label: 'Title' }}
        // errorText={getFieldErrors('name')}
        minLength={10}
        // onBlur={handeNameOnBlur}
        // onChange={handleChange}
        placeholder="Enter a title"
        required
        spellCheck
        // value={formValues.name}
      />
      <Input.Text
        id="to"
        labelProps={{ label: 'To' }}
        placeholder="Enter a route"
      />
      <Input.Text
        id="url"
        labelProps={{ label: 'URL' }}
        //  onChange={handleChange}
        placeholder="Enter a url"
      />
      <Input.Text
        id="parent"
        labelProps={{ label: 'Parent' }}
        placeholder="Enter a menu id"
      />
      {/* <ToolMenu onClick={handeTextInsert} /> */}
      <Input.TextArea
        id="text"
        labelProps={{ label: 'text' }}
        //onBlur={handeTextAreaBlur}
        rows={30}
        spellCheck
      />
      {/* <Input.Text
        {...getDefaultProps('reading_time')}
        // errorText={getFieldErrors('reading_time')}
        label="Reading Time"
      />
      <Input.Text
        {...getDefaultProps('readability_score')}
        label="Readability Score"
      /> */}
    </form>
  );
};

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
