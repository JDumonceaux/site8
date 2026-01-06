const ILLEGAL_RE = /[/?<>\\:*|"]/g;
// eslint-disable-next-line no-control-regex
const CONTROL_RE = /[\x00-\x1f\x80-\x9f]/g;
const RESERVED_RE = /^\.+$/;
// eslint-disable-next-line security/detect-unsafe-regex, regexp/prefer-named-capture-group
const WINDOWS_RESERVED_RE = /^(con|prn|aux|nul|com\d|lpt\d)(\..*)?$/i;
const WINDOWS_TRAILING_RE = /[. ]+$/;

type Options = {
  readonly replacement?: string;
};

const sanitize = (input: string, replacement: string): string => {
  if (typeof input !== 'string') {
    throw new Error('Input must be string');
  }

  return input
    .replace(ILLEGAL_RE, replacement)
    .replace(CONTROL_RE, replacement)
    .replace(RESERVED_RE, replacement)
    .replace(WINDOWS_RESERVED_RE, replacement)
    .replace(WINDOWS_TRAILING_RE, replacement);
};

export const sanitizeFilePath = (input: string, options?: Options): string => {
  const replacement = options?.replacement ?? '';
  const output = sanitize(input, replacement);

  if (replacement === '') {
    return output;
  }

  return sanitize(output, '');
};
