import { useEffect } from 'react';
import { APP_NAME } from '../utils';
import { PantoneColor } from '../components/ui/RightColumn/PantoneColor';
import Ball from '../components/ui/Animation/Ball';
import Floor from '../components/ui/Animation/Floor';

export default function Home() {
  useEffect(() => {
    document.title = `${APP_NAME} - Home`;
  }, []);

  return (
    <>
      <main className='main-content'>
        <section className='section'>
          <p>
            Welcome. The is the skeleton of a site to give you some ideas.
            Hopefully, I'll be able to expand on all these topics in 2024.
          </p>
          <p>There are many excellent tutorials on building React web site.</p>
          <p>
            My goal is to bring everything together: to give you the whole
            picture.
          </p>
          <Ball />
          <Floor />
          {/* <Text3D /> */}
        </section>
      </main>
      <aside className='right-sidebar'>
        <div>
          <img
            src='./images/face.png'
            alt='Original AI generated art'
            title='Original AI generated art'
          />
          <div className='image-text'>Original art by JRD</div>
        </div>
        <PantoneColor />
      </aside>
    </>
  );
}
