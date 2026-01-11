import * as v from 'valibot';

export const VideoSchema = v.object({
  id: v.number(),
  /** Accessible title for the iframe (defaults to `title`) */
  iframeTitle: v.optional(v.string()),
  /** Displayed heading above the video */
  title: v.string(),
  /** Source URL for the embedded video */
  videoSrc: v.pipe(v.string(), v.url()),
});

export type Video = v.InferOutput<typeof VideoSchema>;
