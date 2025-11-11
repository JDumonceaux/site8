import { render, screen } from '@testing-library/react';

import type { AxeResults } from 'axe-core';
import { axe, toHaveNoViolations } from 'jest-axe';
import PageTitle from './PageTitle';
// PageTitle.test.tsx
import '@testing-library/jest-dom';
import 'jest-styled-components';

expect.extend(toHaveNoViolations);

describe('pageTitle component', () => {
  it('renders nothing when no title is provided', () => {
    expect.assertions(1);

    const { container } = render(<PageTitle />);

    expect(container.firstChild).toBeNull();
  });

  it('renders title text in h1 element', () => {
    expect.assertions(2);

    render(<PageTitle title="Hello World" />);
    const titleElement = screen.getByTestId('page-title');

    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe('Hello World');
  });

  it('renders children when provided', () => {
    expect.assertions(2);

    render(
      <PageTitle title="Page">
        <span data-testid="child">Child</span>
      </PageTitle>,
    );

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('forwards HTML attributes to the wrapper element', () => {
    expect.assertions(1);

    const { container } = render(
      <PageTitle
        id="main-title"
        title="Test"
      />,
    );
    const wrapper = container.querySelector('div#main-title');

    expect(wrapper).toBeInTheDocument();
  });

  it('applies correct styles', () => {
    expect.assertions(2);

    const { container } = render(<PageTitle title="Styled" />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveStyle('display: flex');

    const titleElement = screen.getByTestId('page-title');

    expect(titleElement).toHaveStyle('font-size: 2.25rem');
  });

  it('has no a11y violations', async () => {
    expect.hasAssertions();

    const { container } = render(
      <PageTitle title="Accessible">
        <button>Click me</button>
      </PageTitle>,
    );
    const results: AxeResults = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
