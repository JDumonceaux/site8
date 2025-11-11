import { render } from '@testing-library/react';

import type { AxeResults } from 'axe-core';
import { axe, toHaveNoViolations } from 'jest-axe';
import Meta from './Meta';
// Meta.test.tsx
import '@testing-library/jest-dom';
import 'jest-styled-components';

expect.extend(toHaveNoViolations);

describe('meta component', () => {
  it('renders no tags when no props provided', () => {
    expect.assertions(1);

    const { container } = render(<Meta />);

    expect(container.innerHTML).toBe('');
  });

  it('renders charset and viewport meta tags', () => {
    expect.assertions(2);

    const { container } = render(
      <Meta
        charset="UTF-8"
        viewport="width=device-width"
      />,
    );

    expect(
      container.querySelector('meta[charset="UTF-8"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector(
        'meta[name="viewport"][content="width=device-width"]',
      ),
    ).toBeInTheDocument();
  });

  it('renders title, description, og and twitter tags', () => {
    expect.assertions(4);

    const { container } = render(
      <Meta
        name="@creator"
        title="Page Title"
        type="website"
        description="Page description"
      />,
    );

    expect(container.querySelector('title')?.textContent).toBe('Page Title');
    expect(
      container.querySelector(
        'meta[name="description"][content="Page description"]',
      ),
    ).toBeInTheDocument();
    expect(
      container.querySelector('meta[property="og:type"][content="website"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector(
        'meta[name="twitter:creator"][content="@creator"]',
      ),
    ).toBeInTheDocument();
  });

  it('renders link tags for canonical, apple-touch-icon, and manifest', () => {
    expect.assertions(3);

    const { container } = render(
      <Meta
        manifest="/manifest.json"
        appleTouchIcon="/icon.png"
        canonical="https://example.com"
      />,
    );

    expect(
      container.querySelector(
        'link[rel="canonical"][href="https://example.com"]',
      ),
    ).toBeInTheDocument();
    expect(
      container.querySelector('link[rel="apple-touch-icon"][href="/icon.png"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('link[rel="manifest"][href="/manifest.json"]'),
    ).toBeInTheDocument();
  });

  it('renders http-equiv meta tags for X-UA-Compatible and refresh', () => {
    expect.assertions(2);

    const { container } = render(
      <Meta
        refresh="30"
        xUaCompatible="IE=edge"
      />,
    );

    expect(
      container.querySelector(
        'meta[http-equiv="X-UA-Compatible"][content="IE=edge"]',
      ),
    ).toBeInTheDocument();
    expect(
      container.querySelector('meta[http-equiv="refresh"][content="30"]'),
    ).toBeInTheDocument();
  });

  it('renders SEO keywords, robots, author, theme-color tags', () => {
    expect.assertions(4);

    const { container } = render(
      <Meta
        author="Author Name"
        keywords="a,b,c"
        robots="noindex,nofollow"
        themeColor="#ffffff"
      />,
    );

    expect(
      container.querySelector('meta[name="keywords"][content="a,b,c"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector(
        'meta[name="robots"][content="noindex,nofollow"]',
      ),
    ).toBeInTheDocument();
    expect(
      container.querySelector('meta[name="author"][content="Author Name"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('meta[name="theme-color"][content="#ffffff"]'),
    ).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    expect.hasAssertions();

    const { container } = render(
      <Meta
        title="Title"
        canonical="https://example.com"
        description="Desc"
      />,
    );
    const results: AxeResults = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
