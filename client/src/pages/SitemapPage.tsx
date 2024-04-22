'use client';

import StyledNavLink from 'components/common/Link/StyledNavLink/StyledNavLink';

const SitemapPage = (): JSX.Element => (
  <div>
    <h1>Sitemap</h1>
    <div />
    <div>
      This is not an actual sitemap - this is aspirational - what I&#39;m
      working towards.
    </div>

    <ul>
      <li>
        <StyledNavLink to="/">Home</StyledNavLink>
      </li>
    </ul>
  </div>
);

export default SitemapPage;
