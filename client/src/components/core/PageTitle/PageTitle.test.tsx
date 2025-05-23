// PageTitle.test.tsx
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import type { AxeResults } from 'axe-core';

import PageTitle from './PageTitle';

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
    const titleEl = screen.getByTestId('page-title');

    expect(titleEl).toBeInTheDocument();
    expect(titleEl.textContent).toBe('Hello World');
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

    const { container } = render(<PageTitle title="Test" id="main-title" />);
    const wrapper = container.querySelector('div#main-title');

    expect(wrapper).toBeInTheDocument();
  });

  it('applies correct styles', () => {
    expect.assertions(2);

    const { container } = render(<PageTitle title="Styled" />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveStyle('display: flex');

    const titleEl = screen.getByTestId('page-title');

    expect(titleEl).toHaveStyle('font-size: 2.25rem');
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
