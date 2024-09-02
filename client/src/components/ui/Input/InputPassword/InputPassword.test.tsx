import * as Form from '@radix-ui/react-form';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import InputPassword from './InputPassword';
describe('InputPassword', () => {
  test('renders the input correctly', () => {
    render(
      <Form.Root>
        <Form.Field name="test">
          <InputPassword id="test" placeholder="Password" />
        </Form.Field>
      </Form.Root>,
    );

    // type="password" has no role and is therefore not suitable for getByRole
    // https://github.com/w3c/aria/issues/935
    // const inputElement = screen.getByRole('textbox');
    const inputElement = screen.getByPlaceholderText('Password');
    expect(inputElement).toBeInTheDocument();
  });
});
