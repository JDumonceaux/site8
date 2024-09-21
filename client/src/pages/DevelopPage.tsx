import StyledMain from 'components/common/StyledMain/StyledMain';
import Dialog from 'components/core/Dialog/Dialog';
import { useDialog } from 'components/core/Dialog/useDialog';
import EmailAdornment from 'components/Input/Adornments/EmailAdornment';
import ShowAdornment from 'components/Input/Adornments/ShowAdornment';
import Input from 'components/Input/Input';
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
  phone: z.string().optional(),
  password: z.string().optional(),
  tel: z.string().optional(),
  email: z.string().email().optional(),
  name: z.string().min(10).optional(),
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
    const y = pageSchema.shape.title.safeParse(formValues.title);
    return y;
  }, [formValues.title]);

  const x = getTitleErrors();

  /// zODwRAPPER
  /// zodWrapper(pageSchema, initialFormValues, handleSubmit);
  ////zodWrapper

  const { onDialogOpen, onDialogClose, ...dialogProps } = useDialog();

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <StyledMain.Article>
          <PageTitle title={title} />
          <section>
            {/* <div>Title Issues</div> */}
            <button type="button" onClick={onDialogOpen}>
              Open Dialog
            </button>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
              {/* <StyledButton>
                <StyledSaveButton
                  data-testid="button-save"
                  onClick={handleSubmit}
                  type="submit">
                  {isSaved ? 'Saved' : 'Save'}
                </StyledSaveButton>
              </StyledButton>*/}
              {/* <input
                id="title"
                type="text"
                value={getFieldValue('title')}
                onChange={handleChange}
              /> */}
              <Input.Text
                id="title"
                //   helpProps={{ helpText: 'Enter a title' }}
                label="Title"
                //minLength={10}
                maxLength={100}
                // onBlur={handeNameOnBlur}
                onChange={handleChange}
                placeholder="Enter a title"
                required
                //spellCheck
                showCounter
                toolTipProps={{ content: 'Enter a title' }}
                //      value={getFieldValue('title')}

                //layout="horizontal"
                startAdornment={'x:'}
                endAdornments={[
                  'mm',
                  <div>
                    <button type="button">+</button>{' '}
                    <button type="button">-</button>
                  </div>,
                ]}
              />

              <Input.Text
                id="name"
                label="Name"
                minLength={10}
                // onBlur={handeNameOnBlur}
                onChange={handleChange}
                placeholder="Enter a name"
                required
                spellCheck
                value={getFieldValue('name')}
                messageProps={{ match: 'tooShort', name: 'x' }}
              />
              <Input.Password
                id="password"
                label="Password"
                onChange={handleChange}
                placeholder="Enter a password"
                value={getFieldValue('password')}
                endAdornments={<ShowAdornment />}
              />
              <Input.Tel
                id="phone"
                label="Phone"
                onChange={handleChange}
                placeholder="Enter a phone number"
                value={getFieldValue('phone')}
              />
              <Input.Email
                id="email"
                label="Email"
                onChange={handleChange}
                placeholder="Enter an Email"
                value={getFieldValue('email')}
                startAdornment={<EmailAdornment />}
              />
            </form>
          </section>
        </StyledMain.Article>
      </StyledMain>
      <Dialog label="Test" onClose={onDialogClose} {...dialogProps}>
        Children
      </Dialog>
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
