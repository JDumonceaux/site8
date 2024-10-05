import React, { useCallback, useEffect, useMemo, useRef, JSX } from 'react';
import StyledMain from 'components/common/StyledMain/StyledMain';
import Dialog from 'components/core/Dialog/Dialog';
import { useDialog } from 'components/core/Dialog/useDialog';
import EmailAdornment from 'components/Input/Adornments/EmailAdornment';
import Input from 'components/Input/Input';
import Meta from 'components/Meta/Meta';
import PageTitle from 'components/PageTitle/PageTitle';
import { useForm } from 'hooks/useForm';
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
  year: z.string().min(10).optional(),
}),

 DevelopPage = (): JSX.Element => {
  const title = 'Develop';

  // Create a type from the schema
  type FormType = z.infer<typeof pageSchema>;
  type keys = keyof FormType;

  const initialFormValues: FormType = useMemo(
    () => ({
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
      //id: 0,
      //name: '',
      title: '',
      year: '',
    }),
    [],
  ),

   { formValues, getFieldValue, handleChange, handleClearField } =
    useForm<FormType>(initialFormValues),

   handleSubmit = useCallback((error: React.FormEvent) => {
    console.log('handleSubmit');
    error.stopPropagation();
    error.preventDefault();
    //  handleSave();
  }, []),

   getTitleErrors = useCallback(() => {
    const z = formValues.title,
     y = pageSchema.shape.title.safeParse(formValues.title);
    return y;
  }, [formValues.title]),

   x = getTitleErrors(),

  /// zODwRAPPER
  /// zodWrapper(pageSchema, initialFormValues, handleSubmit);
  ////zodWrapper

   { onDialogClose, onDialogOpen, ...dialogProps } = useDialog(),

   firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  return (
    <>
      <Meta title={title} /> 
      <StyledMain>
        <StyledMain.Article>
          <PageTitle title={title} />
          <section>
            {/* <div>Title Issues</div> */}
            <button onClick={onDialogOpen} type="button">Open Dialog</button>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
              <Grid>
                <div>
                  <Grid>
                    <Input.Text
                      autoComplete="given-name"
                      description="Given name"
                      id="given_name"
                      inputRef={firstFieldRef}
                      label="First Name"
                      messageProps={{ match: 'tooShort', name: 'x' }}
                      minLength={10}
                      // onBlur={handeNameOnBlur}
                      onChange={handleChange}
                      placeholder="Enter a first name"
                      required
                      spellCheck
                      value={getFieldValue('given_name')}
                    />
                    <Input.Text
                      autoComplete="family-name"
                      id="family_name"
                      label="Last Name"
                      messageProps={{ match: 'tooShort', name: 'x' }}
                      minLength={10}
                      // onBlur={handeNameOnBlur}
                      onChange={handleChange}
                      onClear={handleClearField}
                      placeholder="Enter a last name"
                      required
                      spellCheck
                      value={getFieldValue('family_name')}
                    />
                  </Grid>
                  {/* <Grid>
                    <Input.Text
                      id="middle_name"
                      label="Middle Name (optional)"
                      minLength={10}
                      // onBlur={handeNameOnBlur}
                      onChange={handleChange}
                      placeholder="Enter a name"
                      required
                      spellCheck
                      value={getFieldValue('middle_name')}
                      messageProps={{ match: 'tooShort', name: 'x' }}
                    />
                    <Input.Text
                      id="honorific_suffix"
                      label="Suffix (optional)"
                      minLength={10}
                      // onBlur={handeNameOnBlur}
                      onChange={handleChange}
                      placeholder="Enter a suffix"
                      required
                      spellCheck
                      value={getFieldValue('honorific_suffix')}
                      messageProps={{ match: 'tooShort', name: 'x' }}
                      helpText={'Examples: Sr., Jr., IV'}
                    />
                  </Grid>
                  <span>Date of Birth</span>
                  <div style={{ display: 'flex' }}>
                    <Input.Number
                      id="month"
                      label="Month"
                      minLength={10}
                      // onBlur={handeNameOnBlur}
                      onChange={handleChange}
                      placeholder="Enter a name"
                      required
                      spellCheck
                      value={getFieldValue('month')}
                      messageProps={{ match: 'tooShort', name: 'x' }}
                    />
                    <Input.Number
                      id="day"
                      label="Day"
                      minLength={10}
                      // onBlur={handeNameOnBlur}
                      onChange={handleChange}
                      placeholder="Enter a name"
                      required
                      spellCheck
                      value={getFieldValue('day')}
                      messageProps={{ match: 'tooShort', name: 'x' }}
                    />
                    <Input.Number
                      id="year"
                      label="Year"
                      minLength={10}
                      // onBlur={handeNameOnBlur}
                      onChange={handleChange}
                      placeholder="Enter a name"
                      required
                      spellCheck
                      value={getFieldValue('year')}
                      messageProps={{ match: 'tooShort', name: 'x' }}
                    />
                  </div> */}
                  <Input.Email
                    id="email"
                    label="Email"
                    onChange={handleChange}
                    placeholder="Enter an Email"
                    startAdornment={<EmailAdornment />}
                    value={getFieldValue('email')}
                  />
                  {/*
                                    <Input.Password
                    id="password"
                    label="Password"
                    onChange={handleChange}
                    placeholder="Enter a password"
                    value={getFieldValue('password')}
                    endAdornment={<ShowAdornment />}
                    helpText={'Enter a password'}
                  />
                  <Input.Text
                    id="address_line1"
                    label="Address"
                    onChange={handleChange}
                    placeholder="Enter an address"
                    value={getFieldValue('address_line1')}
                  />
                  <Input.Text
                    id="address_line2"
                    label="Address (optional)"
                    onChange={handleChange}
                    placeholder="Enter an address 2"
                    value={getFieldValue('address_line2')}
                  />
                  <Input.Text
                    id="country"
                    label="Country"
                    onChange={handleChange}
                    placeholder="Enter an country"
                    value={getFieldValue('country')}
                  />
                  <Input.Text
                    id="state"
                    label="State"
                    onChange={handleChange}
                    placeholder="Enter an state"
                    value={getFieldValue('state')}
                  />
                  <Input.Text
                    id="postal_code"
                    label="Postal Code"
                    onChange={handleChange}
                    placeholder="Enter an postal code"
                    value={getFieldValue('postal_code')}
                  />
                  <Input.Text
                    id="cc_name"
                    label="Name on Card"
                    onChange={handleChange}
                    placeholder="Enter name on card"
                    value={getFieldValue('cc_name')}
                  />
                  <Input.Text
                    id="cc_number"
                    label="Card Number"
                    onChange={handleChange}
                    placeholder="Enter an card number"
                    value={getFieldValue('cc_number')}
                  />

                  <Input.Text
                    id="name2"
                    label="Id"
                    minLength={10}
                    // onBlur={handeNameOnBlur}
                    onChange={handleChange}
                    placeholder="Enter a name"
                    required
                    spellCheck
                    value={getFieldValue('name')}
                    messageProps={{ match: 'tooShort', name: 'x' }}
                    helpText={
                      '<span>? Where do I find this? (Expansion section)</span>'
                    }
                  />
                </div>
                <div>
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
                    value={getFieldValue('title')}
                    startAdornment={'x:'}
                    endAdornment={[
                      'mm',
                      <div>
                        <button type="button">+</button>{' '}
                        <button type="button">-</button>
                      </div>,
                    ]}
                  /> */}

                  {/* <Input.Text
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
                    endAdornment={<ShowAdornment />}
                    helpText={'Enter a password'}
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
                  />*/}
                </div>
              </Grid>
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;
