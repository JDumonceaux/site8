import { useCallback, useEffect, useMemo } from 'react';
import { Meta } from 'components';
import { Button2, LinkButton, TextInput } from 'components/ui/Form';
import { styled } from 'styled-components';
import { APP_NAME, REQUIRED_FIELD } from 'utils';
import { z } from 'zod';
import { safeParse } from 'utils/zodHelper';
import useAuth from 'services/hooks/useAuth';
import { useForm } from 'services/hooks/useForm';
import { PasswordField } from 'components/ui/Form/PasswordField';
import { useNavigate } from 'react-router-dom';

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

  const { signUpUser, isLoading, error, nextStep, socialSignIn } = useAuth();

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

  const navigate = useNavigate();

  const hasError = (fieldName: keys) => {
    return !getFieldErrors(fieldName);
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
          if (nextStep && nextStep === 'CONFIRM_SIGN_UP') {
            navigate('/confirm');
          }
          console.log('nextStep', nextStep);
        } catch (error) {
          // Handle sign-up error
        }
      }
    },
    [validateForm, signUpUser, formValues, navigate, nextStep],
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

  const getStandardTextInputAttributes = (fieldName: keys) => {
    return {
      id: fieldName,
      errorText: getFieldErrors(fieldName),
      hasError: hasError(fieldName),
      value: formValues[fieldName],
    };
  };

  useEffect(() => {
    document.title = `${APP_NAME} - ${title}`;
  }, []);

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <StyledGrid>
          <StyledLeft aria-hidden="true">
            <img alt="" src="/images/face.png" />
          </StyledLeft>
          <StyledRight>
            <StyledH1>Sign Up</StyledH1>
            {error ? (
              <StyledDivError id="error">
                Oops! There was an error: {error}
              </StyledDivError>
            ) : null}
            <form
              aria-errormessage={error ? 'error' : undefined}
              aria-invalid={error ? 'true' : 'false'}
              noValidate
              onSubmit={handleSubmit}>
              <TextInput
                autoComplete="on"
                errorTextShort="Please enter an email address"
                helpText="Required"
                inputMode="email"
                label="Email Address"
                onChange={handleChange}
                placeholder="Enter Email Address"
                required
                spellCheck="false"
                type="email"
                {...getStandardTextInputAttributes('emailAddress')}
              />
              <PasswordField
                errorTextShort="Please enter a password"
                helpText={[
                  'Required',
                  'Must be at least 8 characters',
                  'Max length: 30',
                ]}
                label="Password"
                maxLength={30}
                onChange={handleChange}
                placeholder="Enter Password"
                required
                showCounter
                type="password"
                {...getStandardTextInputAttributes('password')}
              />
              <Button2 id="login" type="submit">
                {isLoading ? 'Processing' : 'Submit'}
              </Button2>
              <br />
              <br />
              <LinkButton id="cancel" to="/">
                Cancel
              </LinkButton>

              <Button2
                id="googgle"
                onClick={() =>
                  socialSignIn({
                    provider: 'Google',
                    customState: 'shopping-cart',
                  })
                }>
                Open Google
              </Button2>
              <Button2
                id="amazon"
                onClick={() =>
                  socialSignIn({
                    provider: 'Amazon',
                    customState: 'shopping-cart',
                  })
                }
                type="button">
                Open Amazon
              </Button2>
            </form>
          </StyledRight>
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
const StyledDivError = styled.div`
  border: 1px solid var(--palette-error);
  color: var(--palette-error);
  padding: 12px 16px;
  font-size: 0.9rem;
  margin-bottom: 20px;
`;

const StyledGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 940px;
  margin: 0 auto;
  margin-top: 60px;
  container: parent;
  container-type: inline-size;
`;
const StyledRight = styled.div`
  @container parent (inline-size > 430px) {
    width: 50%;
    min-width: 360px;
    padding: 0 16px;
  }
  width: 100%;
  max-width: 430px;
  padding: 0 20px;
  margin: 0 auto;
`;
const StyledLeft = styled.div`
  @container parent (inline-size > 430px) {
    margin: 0 auto;
    width: 50%;
    padding: 0 40px;
    max-width: unset;
  }
  margin-left: auto;
  width: 100%;
  max-width: 100px;
  padding: 0 20px 20px 20px;
`;
const StyledH1 = styled.h1`
  font-size: 1.2rem;
  font-weight: 700;
`;
