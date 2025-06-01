import { Suspense, type JSX } from 'react';

import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import SubjectMenu from 'features/generic/SubjectMenu';
import Layout from 'features/layouts/Layout/Layout';
import type { Image } from 'types/Image';
import type { Video } from 'types/Video';

import ImageBlock from './ImageBlock';
import VideoEmbed from './VideoEmbed';

/**
 * Page showcasing yacht designs with images and videos.
 */
export function YachtsPage(): JSX.Element | null {
  const pageTitle = 'Yachts';

  // Data for main article images
  const images: Image[] = [
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
      imageTitle: 'Nature - Observation Lounge',
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
      imageTitle: 'Nature - Guest Bedroom',
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

  // Data for aside videos
  const videos: Video[] = [
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
                I&apos;d do just about anything to own this beautiful beast...
                Is anyone feeling generous?
              </p>
              <p>
                I love the Japanese influence, low profile, clean lines, and
                brooding color. The bow panels on either side slide back to
                expose the floor-to-ceiling windows of the upper observation
                lounge. Large doors fold down from the sides—becoming decks from
                which you can dangle your feet in warm waters.
              </p>
              <p>
                Imagine slipping through tropical waters with a fine drink in
                your hand.
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
                <a href="https://sinot.com/the-art-of-life/">The Art of Life</a>
                , <a href="https://sinot.com/nature/">Nature</a>,{' '}
                <a href="https://sinot.com/zen/">Zen</a>, and{' '}
                <a href="https://sinot.com/balance/">Balance</a>.
              </p>
              {images.map((img) => (
                <ImageBlock key={img.id} {...img} />
              ))}
            </Suspense>
          </Layout.Section>
        </Layout.Article>
        <Layout.Aside>
          {videos.map((video) => (
            <VideoEmbed key={video.id} {...video} />
          ))}
        </Layout.Aside>
      </Layout.Main>
    </>
  );
}

YachtsPage.displayName = 'YachtsPage';
export default YachtsPage;
