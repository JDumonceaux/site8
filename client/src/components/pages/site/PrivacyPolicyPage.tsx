import Meta from 'components/common/Meta/Meta';

const PrivacyPolicyPage = (): JSX.Element => {
  const title = 'Privacy Policy';

  return (
    <>
      <Meta title={title} />
      <div>
        No personally identifiable data is collected this website except in
        conjuction with site security.
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
