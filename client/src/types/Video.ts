export type Video = {
  id: number;
  /** Accessible title for the iframe (defaults to `title`) */
  iframeTitle?: string;
  /** Displayed heading above the video */
  title: string;
  /** Source URL for the embedded video */
  videoSrc: string;
};
