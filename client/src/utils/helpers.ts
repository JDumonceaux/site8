export const getURLPath = (url: string, segment: number) => {
  if (url) {
    return url.split('/').length > segment
      ? url.split('/')[segment]
      : undefined;
  }
  return undefined;
};
