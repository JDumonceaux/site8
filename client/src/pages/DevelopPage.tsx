import * as Form from '@radix-ui/react-form';
import StyledMain from 'components/common/StyledMain/StyledMain';
import InputText from 'components/ui/Input/InputText/InputText';
import StyledPlainButton from 'components/ui/Link/StyledPlainButton/StyledPlainButton';
import Meta from 'components/ui/Meta/Meta';
import PageTitle from 'components/ui/PageTitle/PageTitle';
import { useForm } from 'hooks/useForm';
import { useCallback, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { z } from 'zod';

// Define Zod Shape
const pageSchema = z.object({
  id: z.number(),
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
      required_error: 'Name is required.',
    })
    .max(100, 'Name max length exceeded: 100')
    .trim()
    .optional(),
});

const DevelopPage = (): JSX.Element => {
  const title = 'Develop';

  // Create a type from the schema
  type FormType = z.infer<typeof pageSchema>;
  type keys = keyof FormType;

  const initialFormValues: FormType = useMemo(
    () => ({
      id: 0,
      name: '',
    }),
    [],
  );

  const { getFieldErrors, getFieldValue, handleChange } =
    useForm<FormType>(initialFormValues);
  const [isSaved, setIsSaved] = useState<number>(0);

  const handleSubmit = useCallback((error: React.FormEvent) => {
    error.stopPropagation();
    error.preventDefault();
    //  handleSave();
  }, []);

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <PageTitle title={title} />
        <section>
          <Form.Root onSubmit={handleSubmit}>
            <StyledButton>
              <StyledSaveButton
                data-testid="button-save"
                onClick={handleSubmit}
                type="submit">
                {isSaved ? 'Saved' : 'Save'}
              </StyledSaveButton>
            </StyledButton>
            <InputText
              id="name"
              label="Title"
              minLength={10}
              // onBlur={handeNameOnBlur}
              onChange={handleChange}
              placeholder="Enter a title"
              required
              spellCheck
              value={getFieldValue['name']}

              //layout="horizontal"
              //onBlur={handeNameOnBlur}
              //required
              //spellCheck
            />
          </Form.Root>
        </section>
      </StyledMain>
    </>
  );
};

export default DevelopPage;

const StyledSaveButton = styled(StyledPlainButton)`
  font-weight: 400;
`;
const StyledButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;
