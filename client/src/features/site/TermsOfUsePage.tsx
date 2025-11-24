import type { JSX } from 'react';

import Meta from '@components/core/meta-temp/Meta';

// TermsOfUsePage component
const TermsOfUsePage = (): JSX.Element | null => {
  const lastUpdated = '2024-03-21';
  const contactEmail = 'support@example.com';
  const contactAddress = ['123 Main St.', 'Anytown, USA'];

  return (
    <>
      <Meta title="Terms of Use" />
      <main>
        <article>
          <header>
            <h1>Terms of Use</h1>
            <p>
              <strong>Last updated:</strong>{' '}
              <time dateTime={lastUpdated}>March 21, 2024</time>
            </p>
          </header>

          <section>
            <h2>Agreement to Our Legal Terms</h2>
            <p>
              We are <em>X</em> (“Company,” “we,” “us,” “our”). We operate the
              website example.com (the “Site”) and any related products and
              services that refer or link to these legal terms (collectively,
              the “Services”). You can contact us by email at{' '}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a> or by mail
              to:
            </p>
            <address>
              {contactAddress.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </address>
            <p>
              These Legal Terms constitute a legally binding agreement made
              between you (“you”) and X concerning your access to and use of the
              Services. By accessing the Services, you confirm that you have
              read, understood, and agree to be bound by all of these terms.{' '}
              <strong>
                If you do not agree to all of these terms, do not use the
                Services.
              </strong>
            </p>
          </section>

          <section>
            <h2>Supplemental Terms &amp; Updates</h2>
            <p>
              We may post supplemental terms and conditions on the Services from
              time to time, which are incorporated herein by reference. We
              reserve the right to modify these Legal Terms at our sole
              discretion. We’ll alert you to changes by updating the “Last
              updated” date, and you waive any right to specific notice of each
              change. It’s your responsibility to review these terms
              periodically; continued use of the Services constitutes your
              acceptance of the revised terms.
            </p>
          </section>
        </article>
      </main>
    </>
  );
};

TermsOfUsePage.displayName = 'TermsOfUsePage';
export default TermsOfUsePage;
