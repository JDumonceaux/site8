import Meta from 'components/core/Meta/Meta';

import PageTitle from 'components/core/PageTitle/PageTitle';
import { Suspense } from 'react';
import { styled } from 'styled-components';
import Layout from 'components/layouts/Layout/Layout';
import SubjectMenu from 'feature/generic/SubjectMenu';

const boxStyle = '56.25% 0 0 0';

const YachtsPage = (): React.JSX.Element => {
  const pageTitle = 'Yachts';

  return (
    <>
      <Meta title={pageTitle} />
      <Layout.Main>
        <Layout.Menu>
          <SubjectMenu />
        </Layout.Menu>
        <Layout.Article>
          <PageTitle title={pageTitle} />
          <Layout.Section>
            <Suspense fallback="Loading results ...">
              <p>
                The design of this yacht is called <em>Nature</em>.
              </p>
              <p>
                I&#39;d do just about anything to own this beautiful beast... Is
                anyone feeling generous?
              </p>
              <p>
                I love the Japanese influence, low profile, clean lines, and
                brooding color. The bow panels on either side slide back to
                expose the floor-to-ceiling windows of the upper observation
                lounge. Large doors fold down from the sides - becoming decks
                from which you can dangle your feet in warm waters.
              </p>
              <p>
                Imagine slipping through tropical waters with a fine drink in
                your hand.
              </p>
              <p>
                <a href="https://sinot.com/nature/">
                  Sinot Yacht Architecture and Design
                </a>
                has a range of other beautiful designs:{' '}
                <a href="https://sinot.com/aware/">Aware</a>,{' '}
                <a href="https://sinot.com/beach/">Beach</a>,{' '}
                <a href="https://sinot.com/poetry/">Poetry</a>,{' '}
                <a href="https://sinot.com/aqua/">Aqua</a>,{' '}
                <a href="https://sinot.com/the-art-of-life/">The Art of Life</a>
                , <a href="https://sinot.com/nature/">Nature</a>,{' '}
                <a href="https://sinot.com/zen/">Zen</a>, and{' '}
                <a href="https://sinot.com/balance/">Balance</a>. All equally
                beautiful and innovative.
              </p>
              <div>
                <StyledTitle>Nature Design</StyledTitle>
                <img alt="" src="/images/yachts/sinot-nature-1.jpg.webp" />
              </div>
              <div>
                <StyledTitle>Nature Design</StyledTitle>
                <img alt="" src="/images/yachts/sinot-nature-2.jpg.webp" />
              </div>
              <div>
                <StyledTitle>
                  Nature Design - Observation Lounge with floor to ceiling
                  windows
                </StyledTitle>
                <img
                  alt="Nature - Observation Lounge"
                  src="/images/yachts/sinot-nature-5.png"
                  title="Nature - Observation Lounge"
                />
              </div>
              <div>
                <StyledTitle>Nature Design - Expansive Decks</StyledTitle>
                <img alt="" src="/images/yachts/sinot-nature-3.png" />
              </div>
              <div>
                <StyledTitle>Nature Design - Guest Bedroom</StyledTitle>
                <img
                  alt="Nature - Guest Bedroom"
                  src="/images/yachts/sinot-nature-4.png"
                  title="Nature - Guest Bedroom"
                />
              </div>

              <div>
                <StyledTitle>Beach Design</StyledTitle>
                <img alt="" src="/images/yachts/sinot-beach.png" />
              </div>
              <div>
                <StyledTitle>Aqua Design - Owner&apos; Suite</StyledTitle>
                <img alt="" src="/images/yachts/sinot-aqua-owners-suite.png" />
              </div>
            </Suspense>
          </Layout.Section>
        </Layout.Article>

        <Layout.Aside>
          {/* Art of Life */}
          <div>
            <StyledTitle>Art of Life Design</StyledTitle>
            <div style={{ padding: `${boxStyle}`, position: 'relative' }}>
              <iframe
                allow="autoplay; fullscreen; picture-in-picture"
                src="https://player.vimeo.com/video/290705961?h=9cfff6a399"
                style={{
                  height: '100%',
                  left: 0,
                  position: 'absolute',
                  top: 0,
                  width: '100%',
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
            <StyledTitle>Nature Design</StyledTitle>
            <div style={{ padding: `${boxStyle}`, position: 'relative' }}>
              <iframe
                allow="autoplay; fullscreen; picture-in-picture"
                src="https://player.vimeo.com/video/235907283?h=35a2fec5db"
                style={{
                  height: '100%',
                  left: 0,
                  position: 'absolute',
                  top: 0,
                  width: '100%',
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
            <StyledTitle>Zen Design</StyledTitle>
            <div style={{ padding: `${boxStyle}`, position: 'relative' }}>
              <iframe
                allow="autoplay; fullscreen; picture-in-picture"
                src="https://player.vimeo.com/video/184474900?h=bef5fe895d"
                style={{
                  height: '100%',
                  left: 0,
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                }}
                title="Youtube: Zen Design"
                // frameborder={{0}}
                //allowfullscreen
              />
            </div>
            <script src="https://player.vimeo.com/api/player.js" />
          </div>
        </Layout.Aside>
      </Layout.Main>
    </>
  );
};

export default YachtsPage;

const StyledTitle = styled.div`
  color: #fff;
  background: #585858;
  padding: 12px 16px 6px 16px;
  text-align: center;
  margin-top: 2px;
`;
