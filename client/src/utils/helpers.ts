export const getURLPath = (url: string, segment: number) => {
  if (url) {
    return url.split('/').length > segment
      ? url.split('/')[segment]
      : undefined;
  }
  return undefined;
};

// Convert the parent array to a string
export const combineParent = (
  items: { id?: number; seq?: number }[] | undefined,
): string => {
  if (!items) {
    return '';
  }
  const ret: string[] = [];
  if (!Array.isArray(items)) {
    return '0,0';
  }
  items.forEach((x) => {
    if (x.id != undefined) {
      ret.push(x.id.toString());
    }
    if (x.seq != undefined) {
      ret.push(x.seq.toString());
    }
  });
  return ret.join(',');
};

export const splitParent = (
  value: string | undefined,
): { id: number; seq: number }[] | undefined => {
  if (!value) {
    return undefined;
  }
  const x = value.trim().length > 0 ? value.trim().split(',') : undefined;
  if (!x) {
    return undefined;
  }
  return x
    .map((item, index) => {
      if (index % 2 === 0) {
        const id = parseInt(item);
        const seq = parseInt(x[index + 1]);
        if (!isNaN(id) && !isNaN(seq)) {
          return { id, seq };
        }
      }
      return undefined;
    })
    .filter(Boolean) as { id: number; seq: number }[];
};
