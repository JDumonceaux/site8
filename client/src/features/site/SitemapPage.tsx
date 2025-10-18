import type { JSX } from 'react';

import Meta from '@components/core/Meta/Meta';
import StyledNavLink from '@components/Link/StyledNavLink/StyledNavLink';

const SitemapPage = (): JSX.Element | null => (
  <>
    <Meta title="Sitemap" />
    <main>
      <h1>Sitemap</h1>
      <p>
        This is not an actual sitemap — it’s aspirational, representing what I’m
        working towards.
      </p>
      <nav aria-label="Sitemap navigation">
        <ul>
          <li>
            <StyledNavLink to="/">Home</StyledNavLink>
          </li>
          {/* Add more routes here as they become available */}
        </ul>
      </nav>
    </main>
  </>
);

SitemapPage.displayName = 'SitemapPage';
export default SitemapPage;
