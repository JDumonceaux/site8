import PageTitle from 'components/common/PageTitle/PageTitle';
import SEO from 'components/common/SEO/SEO';
import { useEffect } from 'react';

import { APP_NAME } from '../../utils/constants';

export default function Yachts() {
  const title = 'Yachts';

  useEffect(() => {
    document.title = `${APP_NAME} - ${title}`;
  }, []);

  return (
    <>
      <SEO title={title} />
      <main className="main-content">
        <PageTitle title={title} />
        <section className="section">
          <p>
            The design of this yacht is called <em>Nature</em>.
          </p>
          <p>
            I&#39;d do just about anything to own this beautiful beast... Is anyone
            feeling generous?
          </p>
          <p>
            I love the Japanese influence, low profile, clean lines, and brooding color.
            The bow panels on either side slide back to expose the floor-to-ceiling
            windows of the upper observation lounge. Large doors fold down from the sides
            - becoming decks from which you can dangle your feet in warm waters.
          </p>
          <p>Imagine slipping through tropical waters with a fine drink in your hand.</p>
          <p>
            <a href="https://sinot.com/nature/">Sinot Yacht Architecture and Design</a>{' '}
            has a range of other beautiful designs:{' '}
            <a href="https://sinot.com/aware/">Aware</a>,{' '}
            <a href="https://sinot.com/beach/">Beach</a>,{' '}
            <a href="https://sinot.com/poetry/">Poetry</a>,{' '}
            <a href="https://sinot.com/aqua/">Aqua</a>,{' '}
            <a href="https://sinot.com/the-art-of-life/">The Art of Life</a>,{' '}
            <a href="https://sinot.com/nature/">Nature</a>,{' '}
            <a href="https://sinot.com/zen/">Zen</a>, and{' '}
            <a href="https://sinot.com/balance/">Balance</a>. All equally beautiful and
            innovative.
          </p>
          <div>
            <div className="image-banner-1">Nature Design</div>
            <img src="/images/yachts/sinot-nature-1.jpg.webp" />
          </div>
          <div>
            <div className="image-banner-1">Nature Design</div>
            <img src="/images/yachts/sinot-nature-2.jpg.webp" />
          </div>
          <div>
            <div className="image-banner-1">
              Nature Design - Observation Lounge with floor to ceiling windows
            </div>
            <img
              src="/images/yachts/sinot-nature-5.png"
              alt="Nature - Observation Lounge"
              title="Nature - Observation Lounge"
            />
          </div>
          <div>
            <div className="image-banner-1">Nature Design - Expansive Decks</div>
            <img src="/images/yachts/sinot-nature-3.png" />
          </div>
          <div>
            <div className="image-banner-1">Nature Design - Guest Bedroom</div>
            <img
              src="/images/yachts/sinot-nature-4.png"
              alt="Nature - Guest Bedroom"
              title="Nature - Guest Bedroom"
            />
          </div>

          <div>
            <div className="image-banner-1">Beach Design</div>
            <img src="/images/yachts/sinot-beach.png" />
          </div>
          <div>
            <div className="image-banner-1">Aqua Design - Owner's Suite</div>
            <img src="/images/yachts/sinot-aqua-owners-suite.png" />
          </div>
        </section>
      </main>
      <aside className="right-sidebar">
        {/* Art of Life */}
        <div>
          <div className="image-banner-1">Art of Life Design</div>
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/290705961?h=9cfff6a399"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              // frameborder={{0}}
              allow="autoplay; fullscreen; picture-in-picture"
              //allowfullscreen
            ></iframe>
          </div>
          <script src="https://player.vimeo.com/api/player.js"></script>
        </div>
        {/* Nature */}
        <div>
          <div className="image-banner-1">Nature Design</div>
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/235907283?h=35a2fec5db"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              // frameborder={{0}}
              allow="autoplay; fullscreen; picture-in-picture"
              //allowfullscreen
            ></iframe>
          </div>
          <script src="https://player.vimeo.com/api/player.js"></script>
        </div>
        {/* Zen */}
        <div>
          <div className="image-banner-1">Zen Design</div>
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/184474900?h=bef5fe895d"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              // frameborder={{0}}
              allow="autoplay; fullscreen; picture-in-picture"
              //allowfullscreen
            ></iframe>
          </div>
          <script src="https://player.vimeo.com/api/player.js"></script>
        </div>
      </aside>
    </>
  );
}
