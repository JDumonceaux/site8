import React, { useActionState } from 'react';

import * as Form from '@radix-ui/react-form';
import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Input from 'components/Input/Input';
import StyledPlainButton from 'components/Link/StyledPlainButton/StyledPlainButton';
import styled from 'styled-components';
import type { FormState } from 'types';
import type { Page } from 'types/Page';

import usePagePatch from './usePagePatch';

type PageEditFormProps = {
  readonly data?: null | Page;
};

const PageEditForm = ({ data: initData }: PageEditFormProps): JSX.Element => {
  // const [currentPositionStart, setCurrentPositionStart] = useState<number>(0);
  // const [currentPositionEnd, setCurrentPositionEnd] = useState<number>(0);

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

  const { error, isError, isPending, patchItem } = usePagePatch();

  const [data, action] = useActionState(patchItem, {
    fieldData: initData,
  } as FormState);

  return (
    <LoadingWrapper error={error} isError={isError} isSaving={isPending}>
      <Form.Root action={action}>
        <StyledButtonWrapper>
          <StyledSaveButton data-testid="button-save" type="submit">
            Save
          </StyledSaveButton>
        </StyledButtonWrapper>

        <input id="id" name="id" type="hidden" value={data.fieldData.id} />
        <Input.Text
          defaultValue={data.fieldData.title}
          errors={data.fields?.title.errors}
          id="title"
          // onBlur={handeNameOnBlur}
          // onChange={handleChange}
          labelProps={{ label: 'Title' }}
          maxLength={500}
          // errors={getFieldErrors('name')}
          minLength={10}
          placeholder="Enter a title"
          required
          spellCheck
          // value={formValues.name}
        />
        <Input.Text
          defaultValue={data.fieldData.to}
          id="to"
          labelProps={{ label: 'To' }}
          placeholder="Enter a route"
        />
        <Input.Text
          defaultValue={data.fieldData.url}
          id="url"
          labelProps={{ label: 'URL' }}
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
          defaultValue={data.fieldData.text}
          id="text"
          labelProps={{ label: 'Text' }}
          //onBlur={handeTextAreaBlur}
          rows={30}
          spellCheck
        />
        <Input.Text
          defaultValue={data.fieldData.reading_time}
          id="reading_time"
          labelProps={{ label: 'Reading Time' }}
        />
        <Input.Text
          defaultValue={data.fieldData.readability_score}
          id="readability_score"
          labelProps={{ label: 'Readability Score' }}
        />
      </Form.Root>
    </LoadingWrapper>
  );
};

PageEditForm.displayName = 'PageEditForm';

export default PageEditForm;

const StyledSaveButton = styled(StyledPlainButton)`
  font-weight: 400;
`;
const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;
