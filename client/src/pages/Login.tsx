import './home.css';

import { SEO } from 'components/common';

export default function Login(): JSX.Element {
  const title = 'Login';

  return (
    <>
      <SEO title={title} />
      <div className="content-wrapper">
        <main className="main-content">
          <section className="section">Login</section>
        </main>
      </div>
    </>
  );
}
