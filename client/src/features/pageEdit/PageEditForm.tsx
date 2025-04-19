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
const PageEditForm = ({
  data: initData,
}: PageEditFormProps): React.JSX.Element => {
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

  type FormState = {
    message: string;
    fieldData: Page;
  };

  const [data, action, isPending] = useActionState(saveUser, {
    message: 'Stuck up',
    fieldData: initData,
  } as FormState);

  async function saveUser(
    _prevState: unknown,
    formData: FormData,
  ): Promise<FormState> {
    await 1000;
    console.log('feedback', formData.get('feedback') as string);
    return {
      message: 'error',
      fieldData: {},
    } as FormState;
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
      <div>{data?.message}</div>
      <Input.Text
        id="title"
        labelProps={{ label: 'Title' }}
        defaultValue={data?.fieldData.name}
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
        defaultValue={data?.fieldData.to}
        placeholder="Enter a route"
      />
      <Input.Text
        id="url"
        labelProps={{ label: 'URL' }}
        defaultValue={data?.fieldData.url}
        placeholder="Enter a url"
      />
      <Input.Text
        id="parent"
        labelProps={{ label: 'Parent' }}
        //defaultValue={data?.fieldData.parentItems}
        placeholder="Enter a menu id"
      />
      {/* <ToolMenu onClick={handeTextInsert} /> */}
      <Input.TextArea
        id="text"
        labelProps={{ label: 'Text' }}
        defaultValue={data?.fieldData.text}
        //onBlur={handeTextAreaBlur}
        rows={30}
        spellCheck
      />
      <Input.Text
        id="reading_time"
        labelProps={{ label: 'Reading Time' }}
        defaultValue={data?.fieldData.reading_time}
      />
      <Input.Text
        id="readability_score"
        labelProps={{ label: 'Readability Score' }}
        defaultValue={data?.fieldData.readability_score}
      />
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
