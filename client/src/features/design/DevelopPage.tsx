import React, { type JSX, useEffect, useRef } from 'react';

import Dialog from '@components/core/Dialog/Dialog';
import { useDialog } from '@components/core/Dialog/useDialog';
import Meta from '@components/core/Meta/Meta';
import PageTitle from '@components/core/PageTitle/PageTitle';
import EmailAdornment from '@components/Input/Base/Adornments/EmailAdornment';
import Input from '@components/Input/Input';
import Layout from '@features/layouts/Layout/Layout';
import useForm from '@hooks/useForm';
import styled from 'styled-components';
import { z } from 'zod';

// Define Zod Shape
const pageSchema = z.object({
  address_line1: z.string().min(10).optional(),
  address_line2: z.string().min(10).optional(),
  cc_name: z.string().min(10).optional(),
  cc_number: z.string().min(10).optional(),
  country: z.string().min(10).optional(),
  day: z.string().min(10).optional(),
  email: z.string().email().optional(),
  family_name: z.string().min(10).optional(),
  given_name: z.string().min(10).optional(),
  honorific_prefix: z.string().min(10).optional(),
  honorific_suffix: z.string().min(10).optional(),
  middle_name: z.string().min(10).optional(),
  month: z.string().min(10).optional(),
  name: z.string().min(10).optional(),
  name2: z.string().min(10).optional(),
  nickname: z.string().min(10).optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
  postal_code: z.string().min(10).optional(),
  state: z.string().min(10).optional(),
  tel: z.string().optional(),
  textarea: z.string().optional(),
  title: z
    .string({
      invalid_type_error: 'Title must be a string',
      required_error: 'Title is required.',
    })
    .min(10, 'Title min length not met: 10')
    .max(100, 'Title max length exceeded: 100')
    .describe('Enter a title'),
  year: z.string().min(10).optional(),
});

const DevelopPage = (): JSX.Element => {
  const title = 'Develop';

  // Create a type from the schema
  type FormType = z.infer<typeof pageSchema>;

  const initialFormValues: FormType = {
    address_line1: '',
    address_line2: '',
    cc_name: '',
    cc_number: '',
    country: '',
    day: '',
    email: '',
    family_name: '',
    given_name: '',
    honorific_prefix: '',
    honorific_suffix: '',
    middle_name: '',
    month: '',
    name: '',
    name2: '',
    nickname: '',
    password: '',
    phone: '',
    postal_code: '',
    state: '',
    tel: '',
    textarea: '',
    title: '',
    year: '',
  };

  const { formValues, getFieldValue, handleChange } =
    useForm<FormType>(initialFormValues);

  const handleSubmit = (error: React.FormEvent) => {
    error.stopPropagation();
    error.preventDefault();
    // handleSave();
  };

  const getTitleErrors = () =>
    pageSchema.shape.title.safeParse(formValues.title);

  const { onDialogClose, onDialogOpen, ...dialogProps } = useDialog();
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  return (
    <>
      <Meta title={title} />
      <Layout.Flex>
        <Layout.Main>
          <PageTitle title={title} />
          <section>
            <button
              type="button"
              onClick={onDialogOpen}
            >
              Open Dialog
            </button>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
              <Grid>
                <div>
                  <Grid>
                    <Input.Text
                      required
                      spellCheck
                      id="given_name"
                      label="First Name"
                      minLength={10}
                      value={getFieldValue('given_name')}
                      autoComplete="given-name"
                      onChange={handleChange}
                      placeholder="Enter a first name"
                    />
                    <Input.Text
                      required
                      spellCheck
                      id="family_name"
                      label="Last Name"
                      minLength={10}
                      value={getFieldValue('family_name')}
                      autoComplete="family-name"
                      onChange={handleChange}
                      placeholder="Enter a last name"
                    />
                  </Grid>
                  <Input.Email
                    id="email"
                    label="Email"
                    value={getFieldValue('email')}
                    onChange={handleChange}
                    placeholder="Enter an Email"
                    startAdornment={<EmailAdornment />}
                  />
                  <Input.TextArea
                    required
                    id="textarea"
                    label="Text Area"
                    value={getFieldValue('textarea')}
                    onChange={handleChange}
                    placeholder="Enter text"
                    rows={10}
                  />
                </div>
              </Grid>
            </form>
          </section>
        </Layout.Main>
      </Layout.Flex>
      <Dialog
        label="Test"
        onClose={onDialogClose}
        {...dialogProps}
      >
        Children
      </Dialog>
    </>
  );
};

DevelopPage.displayName = 'DevelopPage';
export default DevelopPage;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;
