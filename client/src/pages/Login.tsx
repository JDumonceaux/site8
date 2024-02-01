import SEO from '../components/common/SEO/SEO';

import './home.css';

export default function Login() {
  const title = 'Login';

  return (
    <>
      <SEO title={title} />
      <div className='content-wrapper'>
        <main className='main-content'>
          <section className='section'>Login</section>
        </main>
      </div>
    </>
  );
}
