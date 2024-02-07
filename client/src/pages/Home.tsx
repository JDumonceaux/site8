import './home.css';

import { SEO } from '../components/common';
import { HomeMenu } from '../components/common/MainMenu/HomeMenu';

export default function Home(): JSX.Element {
  const title = 'Home';

  return (
    <>
      <SEO title={title} />
      <div className="content-wrapper">
        <main className="main-content">
          <section className="section">
            <p>Welcome!</p>
            <p className="home-box1">
              The is the skeleton of a site to give you some ideas. Hopefully, I&#39;ll be
              able to expand on all these topics in 2024.
            </p>
            <p>There are many excellent tutorials on building React web site.</p>
            <p>My goal is to bring everything together: to give you the whole picture.</p>
          </section>
          <section className="quote-section">
            <p>“Three may keep a secret, if two of them are dead.”</p>
            <p>― Benjamin Franklin, Poor Richard&#39;s Almanack</p>
          </section>
        </main>
        <HomeMenu />
      </div>
    </>
  );
}
