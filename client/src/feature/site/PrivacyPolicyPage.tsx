import Meta from 'components/core/Meta/Meta';

const PrivacyPolicyPage = (): React.JSX.Element => {
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
