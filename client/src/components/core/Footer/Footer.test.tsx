import { render, screen } from '@testing-library/react';

import { configureAxe } from 'jest-axe';
import Footer from './Footer';
// Footer.test.tsx
import '@testing-library/jest-dom';

const axe = configureAxe();

describe('footer component', () => {
  test('renders a <footer> element with test id="footer"', () => {
    expect.assertions(2);

    render(<Footer />);
    const footer = screen.getByTestId('footer');

    expect(footer).toBeInTheDocument();
    expect(footer.tagName.toLowerCase()).toBe('footer');
  });

  test('displays the current year preceded by ©', () => {
    expect.assertions(1);

    const thisYear = new Date().getFullYear().toString();
    render(<Footer />);

    expect(screen.getByText(`© ${thisYear}`)).toBeInTheDocument();
  });

  test('contains a <small> element for the copyright text', () => {
    expect.assertions(2);

    render(<Footer />);
    const footer = screen.getByTestId('footer');
    const small = footer.querySelector('small');

    expect(small).toBeInTheDocument();
    expect(small).toHaveTextContent(/©\s*\d{4}/);
  });

  test('has no detectable accessibility violations', async () => {
    expect.assertions(1);

    const { container } = render(<Footer />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
