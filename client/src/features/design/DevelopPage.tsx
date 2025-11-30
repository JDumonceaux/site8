import React, { type JSX, useEffect, useEffectEvent, useRef } from 'react';

import Dialog from '@components/core/dialog/Dialog';
import { useDialog } from '@components/core/dialog/useDialog';
import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import EmailAdornment from '@components/input/base/adornments/EmailAdornment';
import Input from '@components/input/Input';
import Layout from '@features/layouts/layout/Layout';
import useForm from '@hooks/useForm';
import { z } from 'zod';
import styled from 'styled-components';

// Define Zod Shape
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used for type inference
const pageSchema = z.object({
  address_line1: z.string().min(10).optional(),
  address_line2: z.string().min(10).optional(),
  cc_name: z.string().min(10).optional(),
  cc_number: z.string().min(10).optional(),
  country: z.string().min(10).optional(),
  day: z.string().min(10).optional(),
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address')
    .optional(),
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
    .string()
    .min(10, 'Title min length not met: 10')
    .max(100, 'Title max length exceeded: 100')
    .describe('Enter a title'),
  year: z.string().min(10).optional(),
});

const handleSubmit = (error: React.FormEvent) => {
  error.stopPropagation();
  error.preventDefault();
  // handleSave();
};

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

  const { getFieldValue, handleChange } = useForm<FormType>(initialFormValues);

  const { open, toggle, ...dialogProps } = useDialog();

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      toggle();
    }
  };

  const firstFieldRef = useRef<HTMLInputElement>(null);

  const focusFirstFieldEvent = useEffectEvent(() => {
    firstFieldRef.current?.focus();
  });
  useEffect(() => {
    focusFirstFieldEvent();
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
              onClick={open}
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
        onOpenChange={handleDialogOpenChange}
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
