import { PageTitle } from 'components/common/PageTitle';
import { Meta } from 'components/common/Meta';
import { styled } from 'styled-components';

const boxStyle = '56.25% 0 0 0';

export const YachtsPage = (): JSX.Element => {
  return (
    <>
      <Meta title="Yatchs" />
      <StyledMain>
        <PageTitle title="Yatchs" />
        <section className="section">
          <p>
            The design of this yacht is called <em>Nature</em>.
          </p>
          <p>
            I&#39;d do just about anything to own this beautiful beast... Is
            anyone feeling generous?
          </p>
          <p>
            I love the Japanese influence, low profile, clean lines, and
            brooding color. The bow panels on either side slide back to expose
            the floor-to-ceiling windows of the upper observation lounge. Large
            doors fold down from the sides - becoming decks from which you can
            dangle your feet in warm waters.
          </p>
          <p>
            Imagine slipping through tropical waters with a fine drink in your
            hand.
          </p>
          <p>
            <a href="https://sinot.com/nature/">
              Sinot Yacht Architecture and Design
            </a>{' '}
            has a range of other beautiful designs:{' '}
            <a href="https://sinot.com/aware/">Aware</a>,{' '}
            <a href="https://sinot.com/beach/">Beach</a>,{' '}
            <a href="https://sinot.com/poetry/">Poetry</a>,{' '}
            <a href="https://sinot.com/aqua/">Aqua</a>,{' '}
            <a href="https://sinot.com/the-art-of-life/">The Art of Life</a>,{' '}
            <a href="https://sinot.com/nature/">Nature</a>,{' '}
            <a href="https://sinot.com/zen/">Zen</a>, and{' '}
            <a href="https://sinot.com/balance/">Balance</a>. All equally
            beautiful and innovative.
          </p>
          <div>
            <div className="image-banner-1">Nature Design</div>
            <img alt="" src="/images/yachts/sinot-nature-1.jpg.webp" />
          </div>
          <div>
            <div className="image-banner-1">Nature Design</div>
            <img alt="" src="/images/yachts/sinot-nature-2.jpg.webp" />
          </div>
          <div>
            <div className="image-banner-1">
              Nature Design - Observation Lounge with floor to ceiling windows
            </div>
            <img
              alt="Nature - Observation Lounge"
              src="/images/yachts/sinot-nature-5.png"
              title="Nature - Observation Lounge"
            />
          </div>
          <div>
            <div className="image-banner-1">
              Nature Design - Expansive Decks
            </div>
            <img alt="" src="/images/yachts/sinot-nature-3.png" />
          </div>
          <div>
            <div className="image-banner-1">Nature Design - Guest Bedroom</div>
            <img
              alt="Nature - Guest Bedroom"
              src="/images/yachts/sinot-nature-4.png"
              title="Nature - Guest Bedroom"
            />
          </div>

          <div>
            <div className="image-banner-1">Beach Design</div>
            <img alt="" src="/images/yachts/sinot-beach.png" />
          </div>
          <div>
            <div className="image-banner-1">Aqua Design - Owner&#39s Suite</div>
            <img alt="" src="/images/yachts/sinot-aqua-owners-suite.png" />
          </div>
        </section>

        <aside className="right-sidebar">
          {/* Art of Life */}
          <div>
            <div className="image-banner-1">Art of Life Design</div>
            <div style={{ padding: `${boxStyle}`, position: 'relative' }}>
              <iframe
                allow="autoplay; fullscreen; picture-in-picture"
                src="https://player.vimeo.com/video/290705961?h=9cfff6a399"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                title="Youtube: Art of Life Design"
                // frameborder={{0}}
                //allowfullscreen
              />
            </div>
            <script src="https://player.vimeo.com/api/player.js" />
          </div>
          {/* Nature */}
          <div>
            <div className="image-banner-1">Nature Design</div>
            <div style={{ padding: `${boxStyle}`, position: 'relative' }}>
              <iframe
                allow="autoplay; fullscreen; picture-in-picture"
                src="https://player.vimeo.com/video/235907283?h=35a2fec5db"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                title="Youtube: Nature Design"
                // frameborder={{0}}
                //allowfullscreen
              />
            </div>
            <script src="https://player.vimeo.com/api/player.js" />
          </div>
          {/* Zen */}
          <div>
            <div className="image-banner-1">Zen Design</div>
            <div style={{ padding: `${boxStyle}`, position: 'relative' }}>
              <iframe
                allow="autoplay; fullscreen; picture-in-picture"
                src="https://player.vimeo.com/video/184474900?h=bef5fe895d"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                title="Youtube: Zen Design"
                // frameborder={{0}}
                //allowfullscreen
              />
            </div>
            <script src="https://player.vimeo.com/api/player.js" />
          </div>
        </aside>
      </StyledMain>
    </>
  );
};

export default YachtsPage;

const StyledMain = styled.main`
  background-color: #fff;
  background-size: contain;
`;
