import { Divider } from '@aws-amplify/ui-react';
import Button from 'components/form/Button/Button';
import Input from 'components/Input/Input';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import Meta from 'components/core/Meta/Meta';
import useAuth, { SocialProvider } from 'hooks/useAuth';
import { useForm } from 'hooks/useForm';
import { safeParse } from '../lib/utils/zodHelper';
import { useCallback, useId, useMemo } from 'react';
import { styled } from 'styled-components';
import { z } from 'zod';
import AuthContainer from './AuthContainer';
import { emailAddress, password } from 'components/pages/auth/ZodStrings';

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
  type FormKeys = keyof FormValues;

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
        <Button
          ///  icon={<AmazonIcon ariaHidden focusable={false} />}
          id="login"
          onClick={() => handleClick(SocialProvider.AMAZON)}>
          Sign up with Amazon
        </Button>
        <Button
          //  icon={<FacebookIcon ariaHidden focusable={false} />}
          id="login"
          onClick={() => handleClick(SocialProvider.FACEBOOK)}>
          Sign up with Facebook
        </Button>
        <Button
          //  icon={<GoogleIcon ariaHidden focusable={false} />}
          id="login"
          onClick={() => handleClick(SocialProvider.GOOGLE)}>
          Sign up with Google
        </Button>
        <Divider>or</Divider>
        <StyledForm
          noValidate
          // aria-errormessage={error ? 'error' : undefined}
          // aria-invalid={error ? 'true' : 'false'}
          // noValidate
          onSubmit={handleSubmit}>
          <Input.Email
            autoComplete="email"
            //errorTextShort="Please enter an email address"
            label="Email Address"
            multiple={false}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            spellCheck="false"
            {...getDefaultFields('emailAddress' as FormKeys)}
          />
          <Input.Password
            autoComplete="new-password"
            label="Password"
            placeholder="Enter your password"
            {...getDefaultPasswordFields('password' as FormKeys, compId)}
          />
          <InstDiv>
            You will be sent a validation code via email to confirm your
            account.
          </InstDiv>
          <Button id="login" variant="secondary">
            {isLoading ? 'Processing' : 'Submit'}
          </Button>
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
