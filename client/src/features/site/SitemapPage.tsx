import Meta from 'components/core/Meta/Meta';
import StyledNavLink from 'components/Link/StyledNavLink/StyledNavLink';

const SitemapPage: React.FC = (): React.JSX.Element => {
  return (
    <>
      <Meta title="Terms of Use" />
      <h1>Sitemap</h1>
      <div />
      <p>
        This is not an actual sitemap - this is aspirational - what I&#39;m
        working towards.
      </p>

      <nav aria-label="Sitemap navigation">
        <ul>
          <li>
            <StyledNavLink to="/">Home</StyledNavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SitemapPage;
