import { Seo } from 'components/common/SEO';

export default function Login(): JSX.Element {
  const title = 'Login';

  return (
    <>
      <Seo title={title} />
      <div className="content-wrapper">
        <main className="main-content">
          <section className="section">Login</section>
        </main>
      </div>
    </>
  );
}
