import { type JSX, useActionState } from 'react';

import FormSaveButton from '@components/ui/button/FormSaveButton';
import Input from '@components/ui/input/Input';
import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import * as Form from '@radix-ui/react-form';
import type { Page } from '@site8/shared';
import type { FormState } from '@types';
import usePagePatch from './usePagePatch';
import styled from 'styled-components';

type PageEditFormProps = {
  readonly data?: null | Page;
};

const PageEditForm = ({ data: initData }: PageEditFormProps): JSX.Element => {
  // const [currentPositionStart, setCurrentPositionStart] = useState<number>(0);
  // const [currentPositionEnd, setCurrentPositionEnd] = useState<number>(0);

  // const handeTextInsert =
  //   (action: string) => {
  //     const result = insertHTML(
  //       formValues.text,
  //       currentPositionStart,
  //       currentPositionEnd,
  //       action,
  //     );
  //     setFieldValue('text', result);
  //   };

  // const handeNameOnBlur = () => {
  //   if (formValues.name.length > 0 && formValues.to?.length === 0) {
  //     const x = formValues.name.toLowerCase().replaceAll(' ', '-');
  //     setFieldValue('to', x);
  //   }
  // };

  // const handeTextAreaBlur =
  //   (error: React.FocusEvent<HTMLTextAreaElement>) => {
  //     setCurrentPositionStart(error.currentTarget.selectionStart);
  //     setCurrentPositionEnd(error.currentTarget.selectionEnd);
  //   }
  // );

  const { error, isError, isPending, patchItem } = usePagePatch();

  const actionState = useActionState(patchItem, {
    fieldData: initData,
  } as FormState<typeof initData>);

  const data =
    Array.isArray(actionState) &&
    typeof actionState[0] === 'object' &&
    actionState[0] &&
    'fieldData' in actionState[0]
      ? actionState[0]
      : undefined;
  const action = Array.isArray(actionState) ? actionState[1] : undefined;

  // Type guard to check if data is not an error object
  if (!data) {
    return <div>Error...</div>;
  }

  return (
    <LoadingWrapper
      error={error}
      isError={isError}
      isSaving={isPending}
    >
      <Form.Root action={action}>
        <StyledButtonWrapper>
          <FormSaveButton data-testid="button-save">Save</FormSaveButton>
        </StyledButtonWrapper>

        <input
          id="id"
          name="id"
          type="hidden"
          value={data.fieldData?.id}
        />
        <Input.Text
          required
          spellCheck
          {...(data.fieldData?.title !== undefined && {
            defaultValue: data.fieldData.title,
          })}
          id="title"
          label="Title"
          maxLength={500}
          // errors={getFieldErrors('name')}
          minLength={10}
          {...(data.fields?.title.errors && {
            errors: data.fields.title.errors,
          })}
          // onBlur={handeNameOnBlur}
          // onChange={handleChange}
          labelProps={LABEL_TITLE}
          placeholder="Enter a title"
          // value={formValues.name}
        />
        <Input.Text
          defaultValue={data.fieldData?.to ?? ''}
          id="to"
          labelProps={LABEL_TO}
          placeholder="Enter a route"
        />
        <Input.Text
          defaultValue={data.fieldData?.url ?? ''}
          id="url"
          labelProps={LABEL_URL}
          placeholder="Enter a url"
        />
        <Input.Text
          id="parent"
          labelProps={LABEL_PARENT}
          //defaultValue={data?.fieldData.parentItems}
          placeholder="Enter a menu id"
        />
        {/* <ToolMenu onClick={handeTextInsert} /> */}
        <Input.TextArea
          defaultValue={data.fieldData?.text ?? ''}
          id="text"
          labelProps={LABEL_TEXT}
          //onBlur={handeTextAreaBlur}
          rows={30}
          spellCheck
        />
        <Input.Text
          defaultValue={data.fieldData?.reading_time ?? ''}
          id="reading_time"
          labelProps={LABEL_READING_TIME}
        />
        <Input.Text
          defaultValue={data.fieldData?.readability_score ?? ''}
          id="readability_score"
          labelProps={LABEL_READABILITY_SCORE}
        />
      </Form.Root>
    </LoadingWrapper>
  );
};

PageEditForm.displayName = 'PageEditForm';

export default PageEditForm;

// Constant label props to prevent re-renders
const LABEL_TITLE = { label: 'Title' };
const LABEL_TO = { label: 'To' };
const LABEL_URL = { label: 'URL' };
const LABEL_PARENT = { label: 'Parent' };
const LABEL_TEXT = { label: 'Text' };
const LABEL_READING_TIME = { label: 'Reading Time' };
const LABEL_READABILITY_SCORE = { label: 'Readability Score' };

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;
