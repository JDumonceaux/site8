import Meta from 'components/core/Meta/Meta';

const TermsOfUsePage: React.FC = (): React.JSX.Element => {
  const termsContent = `
    TERMS OF USE
    Last updated March 21, 2024

    AGREEMENT TO OUR LEGAL TERMS
    We are X ("Company," "we," "us," "our"). We operate the website example.com (the "Site"), as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services"). You can contact us by email at __________ or by mail to __________, __________, __________.

    These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and X, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.

    Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms from time to time. We will alert you about any changes by updating the "Last updated" date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.
  `;

  return (
    <>
      <Meta title="Terms of Use" />
      <main>
        <h1>Terms of Use</h1>
        <section>
          <p>{termsContent}</p>
        </section>
      </main>
    </>
  );
};

export default TermsOfUsePage;
