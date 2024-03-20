import { useCallback, useEffect, useMemo } from 'react';
import { styled } from 'styled-components';
import useAuth from 'services/hooks/useAuth';
import { z } from 'zod';
import { safeParse } from 'utils/zodHelper';

import { APP_NAME, REQUIRED_FIELD } from 'utils';
import { Meta } from 'components';
import { Button2, LinkButton, TextInput } from 'components/ui/Form';

import { useForm } from 'services/hooks/useForm';

// Define Zod Shape
const pageSchema = z.object({
  emailAddress: z.string().trim(),
  authenticationCode: z
    .string({
      required_error: 'Code is required.',
    })
    .min(1, REQUIRED_FIELD)
    .max(20, 'Max length exceeded: 30')
    .trim(),
});

const ConfirmEmailPage = () => {
  const title = 'Confirmation';
  const { confirmUser, isLoading, error, resendCode } = useAuth();
  type FormValues = z.infer<typeof pageSchema>;
  const defaultFormValues: FormValues = useMemo(
    () => ({
      emailAddress: '',
      authenticationCode: '',
    }),
    [],
  );

  const { formValues, setFormValues, errors, setErrors } =
    useForm<FormValues>(defaultFormValues);

  type keys = keyof FormValues;

  const hasError = (fieldName: keys) => {
    return !getFieldErrors(fieldName);
  };

  const validateForm = useCallback(() => {
    const result = safeParse<FormValues>(pageSchema, formValues);
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
          await confirmUser(
            formValues.emailAddress,
            formValues.authenticationCode,
          );
          // Handle successful sign-up
        } catch (error) {
          // Handle sign-up error
        }
      }
    },
    [validateForm, confirmUser, formValues],
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

  const handleResend = useCallback(async () => {
    try {
      await resendCode(formValues.emailAddress);
    } catch (error) {
      // Handle sign-up error
    }
  }, [resendCode, formValues.emailAddress]);

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
            <img alt="" src="/images/bowler.jpg" />
          </StyledLeft>
          <StyledRight>
            <StyledH1>Confirm Email</StyledH1>
            {error ? <div>Error: {error}</div> : null}
            <form noValidate onSubmit={handleSubmit}>
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
              <TextInput
                errorTextShort="Please enter an authentication code"
                helpText={[
                  'Required',
                  'Check your email for the authentication code.',
                ]}
                inputMode="text"
                label="Authentication Code"
                onChange={handleChange}
                placeholder="Enter Authentication Code"
                showCounter
                spellCheck="false"
                {...getStandardTextInputAttributes('authenticationCode')}
              />
              <Button2 id="login" type="submit">
                {isLoading ? 'Processing' : 'Submit'}
              </Button2>
              <br />
              <br />
              <LinkButton id="cancel" to="/">
                Cancel
              </LinkButton>

              <Button2 id="resend" onClick={handleResend} type="button">
                Resend Sign Up Code
              </Button2>
            </form>
          </StyledRight>
        </StyledGrid>
      </StyledMain>
    </>
  );
};

export default ConfirmEmailPage;

const StyledMain = styled.main`
  background-color: #fff;
  background-size: contain;
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
