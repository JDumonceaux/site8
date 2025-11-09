import { z } from 'zod';

export const VideoSchema = z
  .object({
    id: z.number(),
    /** Accessible title for the iframe (defaults to `title`) */
    iframeTitle: z.string().optional(),
    /** Displayed heading above the video */
    title: z.string(),
    /** Source URL for the embedded video */
    videoSrc: z.url(),
  })
  .strict()
  .readonly();

export type Video = z.infer<typeof VideoSchema>;
