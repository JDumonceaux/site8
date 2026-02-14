const SAFE_URL_PATTERN =
  /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/giu;

/** A pattern that matches safe data URLs. It only matches image, video, and audio types. */
const DATA_URL_PATTERN =
  /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/iu;

export const sanitizeUrl = (url: string): string => {
  const temp = String(url);
  if (temp === 'null' || temp.length === 0 || temp === 'about:blank')
    return 'about:blank';
  if (SAFE_URL_PATTERN.test(temp) || DATA_URL_PATTERN.test(temp)) return temp;

  return `unsafe:${temp}`;
};

export const assertIdParam = (params: Record<string, unknown>): string => {
  const { id } = params;
  if (typeof id !== 'string' || id.trim() === '') {
    throw new Error('Page ID is required for prefetching');
  }
  return id;
};
