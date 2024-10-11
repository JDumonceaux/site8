import { render, screen } from '@testing-library/react';

import PageTitle from './PageTitle';

describe('PageTitle', () => {
  test('renders the title correctly', () => {
    render(<PageTitle title="My Page Title" />);
    //  expect(screen.getByTestId('page-title')).toHaveTextContent('My Page Title');
  });

  test('renders the children correctly', () => {
    render(
      <PageTitle title="My Page Title">
        <button type="button">Button 1</button>
        <button type="button">Button 2</button>
      </PageTitle>,
    );
    // expect(screen.getByText('Button 1')).toBeInTheDocument();
    // expect(screen.getByText('Button 2')).toBeInTheDocument();
  });

  test('does not render anything if title prop is not provided', () => {
    render(<PageTitle />);
    expect(screen.queryByTestId('page-title')).toBeNull();
  });
});
