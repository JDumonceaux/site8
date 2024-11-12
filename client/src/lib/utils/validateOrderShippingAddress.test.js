import validateOrderShippingAddress from './validateOrderShippingAddress.js';

// Test case 1: All fields are provided correctly

test('Valid shipping address', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: 'Apt 4B',
    City: 'New York',
    CompanyName: 'ABC Company',
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toEqual([]);
});

// Test case 2: Missing AddressLine1

test('Missing AddressLine1', () => {
  const shippingAddress = {
    AddressLine2: 'Apt 4B',
    City: 'New York',
    CompanyName: 'ABC Company',
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingAddress1Required');
});

// Test case 3: Missing City

test('Missing City', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: 'Apt 4B',
    CompanyName: 'ABC Company',
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingCityRequired');
});

// Test case 4: Missing State

test('Missing State', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: 'Apt 4B',
    City: 'New York',
    CompanyName: 'ABC Company',
    PostalCode: '10001',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingStateRequired');
});

// Test case 5: Missing PostalCode

test('Missing PostalCode', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: 'Apt 4B',
    City: 'New York',
    CompanyName: 'ABC Company',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingPostalCodeRequired');
});

// Test case 6: Missing CompanyName

test('Missing CompanyName', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: 'Apt 4B',
    City: 'New York',
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingCompanyNameRequired');
});

// Test case 7: Non-printable character - Alt 1

test('Valid shipping address - non-printable character Alt 1', () => {
  const shippingAddress = {
    AddressLine1: '123☺Main St',
    AddressLine2: 'Apt 4B',
    City: 'New York',
    CompanyName: 'ABC Company',
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingAddress1NotValid');
});

// Test case 8: Null

test('Valid shipping address - Null', () => {
  const shippingAddress = {
    AddressLine1: null,
    AddressLine2: 'Apt 4B',
    City: 'New York',
    CompanyName: 'ABC Company',
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingAddress1Required');
});

// Test case 9: Zero Length

test('Valid shipping address - zero length', () => {
  const shippingAddress = {
    AddressLine1: '',
    AddressLine2: 'Apt 4B',
    City: 'New York',
    CompanyName: 'ABC Company',
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingAddress1Required');
});

// Test case 10: Non-printable character - Alt 1

test('Valid shipping address 2 - non-printable character Alt 1', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: 'Apt☺4B',
    City: 'New York',
    CompanyName: 'ABC Company',
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingAddress2NotValid');
});

// Test case 11: Null

test('Valid shipping address 2 - Null', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: null,
    City: 'New York',
    CompanyName: 'ABC Company',
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingAddress2Required');
});

// Test case 12: Zero Length

test('Valid shipping address 2 - zero length', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: '',
    City: 'New York',
    CompanyName: 'ABC Company',
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingAddress2Required');
});

// Test case 14: Non-printable character - Alt 1

test('Valid shipping city - non-printable character Alt 1', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: 'Apt 4B',
    City: 'New☺York',
    CompanyName: 'ABC Company',
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingCityNotValid');
});

// Test case 15:  Null

test('Valid shipping city - Null', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: 'Apt 4B',
    City: null,
    CompanyName: 'ABC Company',
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingCityRequired');
});

// Test case 16: Zero Length

test('Valid shipping city - zero length', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: 'Apt 4B',
    City: '',
    CompanyName: 'ABC Company',
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingCityRequired');
});

// Test case 17: Non-printable character - Alt 1

test('Valid shipping postal code - non-printable character Alt 1', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: 'Apt 4B',
    City: 'New York',
    CompanyName: 'ABC Company',
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingPostalCodeValid');
});

// Test case 18: Null

test('Valid shipping postal code - Null', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: 'Apt 4B',
    City: 'New York',
    CompanyName: 'ABC Company',
    PostalCode: null,
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingPostalCodeRequired');
});

// Test case 19: Zero Length

test('Valid shipping postal code - zero length', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: 'Apt 4B',
    City: 'New York',
    CompanyName: 'ABC Company',
    PostalCode: '',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingPostalCodeRequired');
});

// Test case 20: Non-printable character - Alt 1

test('Valid shipping company name - non-printable character Alt 1', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: 'Apt 4B',
    City: 'New York',
    CompanyName: 'ABC Company',
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingCompanyNotValid');
});

// Test case 21:  Null

test('Valid shipping company name - Null', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: 'Apt 4B',
    City: 'New York',
    CompanyName: null,
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingCompanyRequired');
});

// Test case 22: Zero Length

test('Valid shipping company name - zero length', () => {
  const shippingAddress = {
    AddressLine1: '123 Main St',
    AddressLine2: 'Apt 4B',
    City: 'New York',
    CompanyName: '',
    PostalCode: '10001',
    State: 'NY',
  };

  const validationIssues = validateOrderShippingAddress(shippingAddress);

  expect(validationIssues).toContain('validation/shippingCompanyRequired');
});
