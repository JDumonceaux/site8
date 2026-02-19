import { type JSX, Suspense } from 'react';

import StickyMenuWrapper from '@components/layout/StickyMenuWrapper';
import Meta from '@components/meta/Meta';
import PageTitle from '@components/page/PageTitle';
import SubjectMenu from '@features/generic/SubjectMenu';
import Layout from '@features/layouts/layout/Layout';
import type { Image, Video } from '@types';
import ImageBlock from './ImageBlock';
import VideoEmbed from './VideoEmbed';

const PAGE_TITLE = 'Yachts';

// Static data moved outside component to avoid re-allocation each render
const IMAGES: Image[] = [
  {
    alt: 'Nature Design 1',
    id: 1,
    src: '/images/yachts/sinot-nature-1.jpg.webp',
    title: 'Nature Design',
  },
  {
    alt: 'Nature Design 2',
    id: 2,
    src: '/images/yachts/sinot-nature-2.jpg.webp',
    title: 'Nature Design',
  },
  {
    alt: 'Nature - Observation Lounge',
    id: 3,
    src: '/images/yachts/sinot-nature-5.png',
    title: 'Nature Design - Observation Lounge with floor to ceiling windows',
  },
  {
    alt: 'Nature Design - Expansive Decks',
    id: 4,
    src: '/images/yachts/sinot-nature-3.png',
    title: 'Nature Design - Expansive Decks',
  },
  {
    alt: 'Nature - Guest Bedroom',
    id: 5,
    src: '/images/yachts/sinot-nature-4.png',
    title: 'Nature Design - Guest Bedroom',
  },
  {
    alt: 'Beach Design',
    id: 6,
    src: '/images/yachts/sinot-beach.png',
    title: 'Beach Design',
  },
  {
    alt: "Aqua Design - Owner's Suite",
    id: 7,
    src: '/images/yachts/sinot-aqua-owners-suite.png',
    title: "Aqua Design - Owner's Suite",
  },
];

const VIDEOS: Video[] = [
  {
    id: 1,
    iframeTitle: 'Art of Life Design',
    title: 'Art of Life Design',
    videoSrc: 'https://player.vimeo.com/video/290705961?h=9cfff6a399',
  },
  {
    id: 2,
    iframeTitle: 'Nature Design',
    title: 'Nature Design',
    videoSrc: 'https://player.vimeo.com/video/235907283?h=35a2fec5db',
  },
  {
    id: 3,
    iframeTitle: 'Zen Design',
    title: 'Zen Design',
    videoSrc: 'https://player.vimeo.com/video/184474900?h=bef5fe895d',
  },
];

/**
 * Page showcasing yacht designs with images and videos.
 */
export const YachtsPage = (): JSX.Element => (
  <>
    <Meta title={PAGE_TITLE} />
    <Layout.Main>
      <Layout.Menu>
        <StickyMenuWrapper variant="plain">
          <SubjectMenu />
        </StickyMenuWrapper>
      </Layout.Menu>
      <Layout.Article>
        <PageTitle title={PAGE_TITLE} />
        <Layout.Section>
          {/* Suspense is not doing anything unless children are lazy; keep or remove */}
          <Suspense fallback="Loading results ...">
            <p>
              The design of this yacht is called <em>Nature</em>.
            </p>
            <p>
              I&apos;d do just about anything to own this beautiful beast... Is
              anyone feeling generous?
            </p>
            <p>
              I love the Japanese influence, low profile, clean lines, and
              brooding color. The bow panels on either side slide back to expose
              the floor-to-ceiling windows of the upper observation lounge.
              Large doors fold down from the sides—becoming decks from which you
              can dangle your feet in warm waters.
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
              <a href="https://sinot.com/balance/">Balance</a>.
            </p>
            {IMAGES.map((img) => (
              <ImageBlock
                key={img.id}
                {...img}
              />
            ))}
          </Suspense>
        </Layout.Section>
      </Layout.Article>
      <Layout.Aside>
        {VIDEOS.map((video) => (
          <VideoEmbed
            key={video.id}
            {...video}
          />
        ))}
      </Layout.Aside>
    </Layout.Main>
  </>
);

YachtsPage.displayName = 'YachtsPage';
export default YachtsPage;
