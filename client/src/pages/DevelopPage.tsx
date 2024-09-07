import * as Form from '@radix-ui/react-form';
import StyledMain from 'components/common/StyledMain/StyledMain';
import InputText from 'components/Input/InputText/InputText';
import StyledPlainButton from 'components/Link/StyledPlainButton/StyledPlainButton';
import Meta from 'components/Meta/Meta';
import PageTitle from 'components/PageTitle/PageTitle';
import { useForm } from 'hooks/useForm';
import { useCallback, useMemo } from 'react';
import { styled } from 'styled-components';
import { z } from 'zod';

// Define Zod Shape
const pageSchema = z.object({
  // id: z.number(),
  // name: z
  //   .string({
  //     invalid_type_error: 'Name must be a string',
  //     required_error: 'Name is required.',
  //   })
  //   .max(100, 'Name max length exceeded: 100')
  //   .trim()
  //   .optional(),
  title: z
    .string({
      invalid_type_error: 'Title must be a string',
      required_error: 'Title is required.',
    })
    .min(10, 'Title min length not met: 10')
    .max(100, 'Title max length exceeded: 100')
    .describe('Enter a title'),
});

const DevelopPage = (): JSX.Element => {
  const title = 'Develop';

  // Create a type from the schema
  type FormType = z.infer<typeof pageSchema>;
  type keys = keyof FormType;

  const initialFormValues: FormType = useMemo(
    () => ({
      //id: 0,
      //name: '',
      title: '',
      // phone: '',
      // password: '',
      // email: '',
    }),
    [],
  );

  const { formValues, getFieldValue, isSaved, handleChange } =
    useForm<FormType>(initialFormValues);

  const handleSubmit = useCallback((error: React.FormEvent) => {
    error.stopPropagation();
    error.preventDefault();
    //  handleSave();
  }, []);

  const getTitleErrors = useCallback(() => {
    const z = formValues.title;
    console.log('z', z);

    const y = pageSchema.shape.title.safeParse(formValues.title);
    return y;
  }, [formValues.title]);

  const x = getTitleErrors();
  console.log('x', x);
  console.log('p', pageSchema.shape.title.minLength);

  /// zODwRAPPER
  /// zodWrapper(pageSchema, initialFormValues, handleSubmit);
  ////zodWrapper

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <StyledMain.Article>
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
                id="title"
                helpProps={{ helpText: 'Enter a title' }}
                label="Title"
                minLength={10}
                maxLength={100}
                // onBlur={handeNameOnBlur}
                onChange={handleChange}
                placeholder="Enter a title"
                required
                spellCheck
                showCounter
                toolTipProps={{ label: 'Enter a title' }}
                value={getFieldValue('title')}

                //layout="horizontal"
                //onBlur={handeNameOnBlur}
                //required
                //spellCheck
              />
              <div>Title Issues</div>

              {/* <InputText
                id="name"
                label="Name"
                minLength={10}
                // onBlur={handeNameOnBlur}
                onChange={handleChange}
                placeholder="Enter a name"
                required
                spellCheck
                value={getFieldValue('name')}
                messageProps={{ match: 'tooShort', name: 'x' }} */}

              {/* //layout="horizontal"
                //onBlur={handeNameOnBlur}
                //required
                //spellCheckp\
              /> */}
              {/* <InputPassword
                id="password"
                label="Password"
                onChange={handleChange}
                placeholder="Enter a password"
                value={getFieldValue('password')}
              />
              <InputTel
                id="phone"
                label="Phone"
                onChange={handleChange}
                placeholder="Enter a phone number"
                value={getFieldValue('phone')}
              />
              <InputEmail
                id="email"
                label="Email"
                onChange={handleChange}
                placeholder="Enter an Email"
                value={getFieldValue('email')} */}
              {/* /> */}
            </Form.Root>
          </section>
        </StyledMain.Article>
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
