import { type JSX, useActionState } from 'react';

import LoadingWrapper from '@components/core/loading/LoadingWrapper';
import Input from '@components/input/Input';
import StyledPlainButton from '@components/link/styled-plain-button/StyledPlainButton';
import * as Form from '@radix-ui/react-form';
import type { FormState } from '@shared/types';
import type { Page } from '@shared/types/Page';
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

  const [data, action] = useActionState(patchItem, {
    fieldData: initData,
  } as FormState<typeof initData>);

  return (
    <LoadingWrapper
      isSaving={isPending}
      error={error}
      isError={isError}
    >
      <Form.Root action={action}>
        <StyledButtonWrapper>
          <StyledSaveButton
            data-testid="button-save"
            type="submit"
          >
            Save
          </StyledSaveButton>
        </StyledButtonWrapper>

        <input
          id="id"
          name="id"
          type="hidden"
          value={data.fieldData.id}
        />
        <Input.Text
          required
          spellCheck
          defaultValue={data.fieldData.title}
          id="title"
          label="Title"
          maxLength={500}
          // errors={getFieldErrors('name')}
          minLength={10}
          errors={data.fields?.title.errors}
          // onBlur={handeNameOnBlur}
          // onChange={handleChange}
          labelProps={{ label: 'Title' }}
          placeholder="Enter a title"
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
          spellCheck
          defaultValue={data.fieldData.text}
          id="text"
          labelProps={{ label: 'Text' }}
          //onBlur={handeTextAreaBlur}
          rows={30}
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
