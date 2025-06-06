import Meta from 'components/core/Meta/Meta';
import type { JSX } from 'react';

/**
 * Cookies Use page – describes cookie usage on the site.
 */
export const CookiesUsePage = (): JSX.Element => (
  <>
    <Meta title="Cookies Use" />
    <main aria-labelledby="cookies-use-heading">
      <header>
        <h1 id="cookies-use-heading">Cookies Use</h1>
      </header>
      <section>
        <p>No cookies were used or injured in the making of this website.</p>
        <footer>
          <p>Validated by Betty Crocker</p>
        </footer>
      </section>
    </main>
  </>
);

CookiesUsePage.displayName = 'CookiesUsePage';
export default CookiesUsePage;
