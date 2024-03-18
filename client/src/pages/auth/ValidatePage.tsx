import { useCallback, useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import useAuth from 'services/hooks/useAuth';
import { z } from 'zod';
import { safeParse } from 'utils/zodHelper';

import { Link, useNavigate } from 'react-router-dom';
import { APP_NAME, REQUIRED_FIELD } from 'utils';
import { Button } from '@aws-amplify/ui-react';
import { Meta } from 'components';
import { TextInput } from 'components/ui/Form';

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

const ValidatePage = () => {
  const title = 'Confirmation';
  const { confirmUser, isLoading } = useAuth();

  type PageFormValues = z.infer<typeof pageSchema>;
  const defaultFormValues: PageFormValues = useMemo(
    () => ({
      emailAddress: '',
      authenticationCode: '',
    }),
    [],
  );
  type keys = keyof PageFormValues;
  const [errors, setErrors] =
    useState<z.ZodFormattedError<PageFormValues> | null>(null);
  const [formValues, setFormValues] =
    useState<PageFormValues>(defaultFormValues);

  const isValid = (fieldName: keys) => {
    return getFieldErrors(fieldName) ? false : true;
  };

  const validateForm = useCallback(() => {
    const result = safeParse<PageFormValues>(pageSchema, formValues);
    setErrors(result.errorFormatted);
    return result.success;
  }, [formValues]);

  const getFieldErrors = useCallback(
    (fieldName: keys) => {
      return errors && errors[fieldName]?._errors;
    },
    [errors],
  );

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (validateForm()) {
        try {
          await confirmUser(formValues.userName, formValues.authenticationCode);
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
                spellCheck="false"
              />
              <TextInput
                errorText={getFieldErrors('authenticationCode')}
                errorTextShort="Please enter an authentication code"
                helpText={[
                  'Required',
                  'Check your email for the authentication code.',
                ]}
                id="authenticationCode"
                inputMode="text"
                isValid={isValid('authenticationCode')}
                label="Authentication Code"
                onChange={handleChange}
                placeholder="Enter Authentication Code"
                showCounter
                spellCheck="false"
                //type="password"
              />
              <Button id="login" type="submit">
                {isLoading ? 'Processing' : 'Submit'}
              </Button>
              <br />
              <br />
              <Link to="/">Cancel</Link>
              <p>---- OR ----</p>
              <Link to="/signup">
                <Button id="signup">Sign Up</Button>
              </Link>
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

export default ValidatePage;

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
