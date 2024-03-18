import { useCallback, useEffect, useMemo } from 'react';
import { Meta } from 'components';
import { Button2, LinkButton, TextInput } from 'components/ui/Form';
import { styled } from 'styled-components';
import { APP_NAME, REQUIRED_FIELD } from 'utils';
import { z } from 'zod';
import { safeParse } from 'utils/zodHelper';
import useAuth from 'services/hooks/useAuth';
import { useForm } from 'services/hooks/useForm';

// Define Zod Shape
const schema = z.object({
  password: z
    .string({
      required_error: 'Password is required.',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, REQUIRED_FIELD)
    .max(30, 'Max length exceeded: 30')
    .trim(),
  emailAddress: z
    .string({
      required_error: 'eMail Address is required.',
      invalid_type_error: 'eMail Address must be a string',
    })
    .min(1, REQUIRED_FIELD)
    .max(250)
    .trim(),
});

const SignupPage = () => {
  const title = 'Sign-Up';

  const { signUpUser, isLoading } = useAuth();

  type FormValues = z.infer<typeof schema>;
  type keys = keyof FormValues;
  const defaultFormValues: FormValues = useMemo(
    () => ({
      emailAddress: '',
      password: '',
    }),
    [],
  );
  const { formValues, setFormValues, errors, setErrors } =
    useForm<FormValues>(defaultFormValues);

  //const navigate = useNavigate();

  const isValid = (fieldName: keys) => {
    return getFieldErrors(fieldName) ? false : true;
  };

  const validateForm = useCallback(() => {
    const result = safeParse<FormValues>(schema, formValues);
    setErrors(result.errorFormatted);
    return result.success;
  }, [formValues, setErrors]);

  const getFieldErrors = useCallback(
    (fieldName: keys) => {
      return errors && errors[fieldName]?._errors;
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (validateForm()) {
        try {
          await signUpUser(formValues.emailAddress, formValues.password);
          // Handle successful sign-up
        } catch (error) {
          // Handle sign-up error
        }
      }
    },
    [validateForm, signUpUser, formValues],
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    document.title = `${APP_NAME} - ${title}`;
  }, []);

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <StyledGrid>
          <div>
            <StyledH1>Sign Up</StyledH1>
            <form noValidate onSubmit={handleSubmit}>
              <TextInput
                autoComplete="on"
                errorText={getFieldErrors('emailAddress')}
                errorTextShort="Please enter an email address"
                helpText="Required"
                id="emailAddress"
                inputMode="email"
                isValid={isValid('emailAddress')}
                label="Email Address"
                onChange={handleChange}
                placeholder="Enter Email Address"
                required
                spellCheck="false"
                type="email"
                value={formValues['emailAddress']}
              />
              <TextInput
                errorText={getFieldErrors('password')}
                errorTextShort="Please enter a password"
                helpText={[
                  'Required',
                  'Must be at least 8 characters',
                  'Max length: 30',
                ]}
                id="password"
                inputMode="text"
                isValid={isValid('password')}
                label="Password"
                maxLength={30}
                onChange={handleChange}
                placeholder="Enter Password"
                required
                showCounter
                spellCheck="false"
                type="password"
                value={formValues['password']}
              />
              <Button2 id="login" type="submit">
                {isLoading ? 'Processing' : 'Submit'}
              </Button2>
              <br />
              <br />
              <LinkButton id="cancel" to="/">
                Cancel
              </LinkButton>
            </form>
          </div>
          <div>
            <img alt="" src="/images/face.png" />
          </div>
        </StyledGrid>
      </StyledMain>
    </>
  );
};

export default SignupPage;

const StyledMain = styled.main`
  background-color: #fff;
  background-size: contain;
`;
const StyledGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  max-width: 940px;
  margin: 0 auto;
  margin-top: 20px;
  > div:first-child {
    width: 360px;
    min-width: 360px;
    padding: 0 16px;
  }
  > div:nth-child(2) {
    margin: 0 auto;
    padding: 0 40px;
  }
`;
const StyledH1 = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
`;
