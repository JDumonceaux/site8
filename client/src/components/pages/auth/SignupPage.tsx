import { Divider } from '@aws-amplify/ui-react';
import { Button2 } from 'components/form/Button2';
import { AmazonIcon, FacebookIcon, GoogleIcon } from 'components/icons';
import { EmailField, PasswordField } from 'components/ui/Input';
import StyledLink from 'components/ui/Link/StyledLink/StyledLink';
import Meta from 'components/ui/Meta/Meta';
import useAuth, { SocialProvider } from 'hooks/useAuth';
import { useForm } from 'hooks/useForm';
import { safeParse } from 'lib/utils/zodHelper';
import { useCallback, useId, useMemo } from 'react';
import { styled } from 'styled-components';
import { z } from 'zod';
import AuthContainer from './AuthContainer';
import { emailAddress, password } from './ZodStrings';

// Define Zod Shape
const schema = z.object({
  // eslint-disable-next-line object-shorthand
  password: password,
  // eslint-disable-next-line object-shorthand
  emailAddress: emailAddress,
});

const SignupPage = (): JSX.Element => {
  const title = 'Sign-Up';
  const compId = useId();

  type FormValues = z.infer<typeof schema>;
  type keys = keyof FormValues;

  const { authSignUp, authSignInWithRedirect, isLoading, error } = useAuth();

  const defaultFormValues: FormValues = useMemo(
    () => ({
      emailAddress: '',
      password: '',
    }),
    [],
  );

  const {
    formValues,
    setErrors,
    handleChange,
    getDefaultFields,
    getDefaultPasswordFields,
  } = useForm<FormValues>(defaultFormValues);

  const validateForm = useCallback(() => {
    const result = safeParse<FormValues>(schema, formValues);
    setErrors(result.error?.issues);
    return result.success;
  }, [formValues, setErrors]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (validateForm()) {
        try {
          await authSignUp(formValues.emailAddress, formValues.password);
        } catch (error) {
          // Handle sign-up error
        }
      }
    },
    [validateForm, authSignUp, formValues],
  );

  const handleClick = (provider: SocialProvider) => {
    authSignInWithRedirect(provider);
  };

  return (
    <>
      <Meta title={title} />
      <AuthContainer
        error={error}
        leftImage={<img alt="" src="/images/face.png" />}
        title="Sign Up">
        <Button2
          icon={<AmazonIcon ariaHidden focusable={false} />}
          id="login"
          marginBottom="15px"
          onClick={() => handleClick(SocialProvider.AMAZON)}
          type="button">
          Sign up with Amazon
        </Button2>
        <Button2
          icon={<FacebookIcon ariaHidden focusable={false} />}
          id="login"
          marginBottom="15px"
          onClick={() => handleClick(SocialProvider.FACEBOOK)}
          type="button">
          Sign up with Facebook
        </Button2>
        <Button2
          icon={<GoogleIcon ariaHidden focusable={false} />}
          id="login"
          marginBottom="15px"
          onClick={() => handleClick(SocialProvider.GOOGLE)}
          type="button">
          Sign up with Google
        </Button2>
        <Divider>or</Divider>
        <StyledForm
          noValidate
          // aria-errormessage={error ? 'error' : undefined}
          // aria-invalid={error ? 'true' : 'false'}
          // noValidate
          onSubmit={handleSubmit}>
          <EmailField
            autoComplete="email"
            errorTextShort="Please enter an email address"
            inputMode="email"
            label="Email Address"
            multiple={false}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            spellCheck="false"
            type="email"
            {...getDefaultFields('emailAddress' as keys)}
          />
          <PasswordField
            autoComplete="new-password"
            label="Password"
            placeholder="Enter your password"
            {...getDefaultPasswordFields('password' as keys, compId)}
          />
          <InstDiv>
            You will be sent a validation code via email to confirm your
            account.
          </InstDiv>
          <Button2 id="login" type="submit" variant="secondary">
            {isLoading ? 'Processing' : 'Submit'}
          </Button2>
        </StyledForm>
        <TermsDiv>
          By clicking &quot;Submit&quot; you are agreeing to the{' '}
          <StyledLink to="/terms-of-use">Terms of Use</StyledLink>,{' '}
          <StyledLink to="/privacy-policy">Privacy Policy</StyledLink>, and{' '}
          <StyledLink to="/cookie-use">Cookie Use Policy</StyledLink> of this
          site.
        </TermsDiv>
        <StyledBottomMsg>
          Already have an account? <StyledLink to="/signin">Sign in</StyledLink>
        </StyledBottomMsg>
      </AuthContainer>
    </>
  );
};

export default SignupPage;

const StyledForm = styled.form`
  padding: 20px 0;
`;
const StyledBottomMsg = styled.div`
  padding: 20px 0;
  text-align: center;
`;
const TermsDiv = styled.div`
  padding: 16px 0;
  font-size: 0.7rem;
`;
const InstDiv = styled.div`
  padding: 16px 0;
  font-size: 0.9rem;
  text-wrap: pretty;
  text-align: center;
`;