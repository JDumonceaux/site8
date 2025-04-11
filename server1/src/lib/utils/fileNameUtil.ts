'use strict';

const illegalRe = /[\/\?<>\\:\*\|"]/g;
const controlRe = /[\x00-\x1f\x80-\x9f]/g;
const reservedRe = /^\.+$/;
const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
const windowsTrailingRe = /[\. ]+$/;

interface Options {
  replacement?: string;
}

function sanitize(input: string, replacement: string): string {
  if (typeof input !== 'string') {
    throw new Error('Input must be string');
  }
  const sanitized = input
    .replace(illegalRe, replacement)
    .replace(controlRe, replacement)
    .replace(reservedRe, replacement)
    .replace(windowsReservedRe, replacement)
    .replace(windowsTrailingRe, replacement);
  return sanitized;
}

export function sanitizeFilePath(input: string, options?: Options): string {
  const replacement =
    options && typeof options.replacement !== 'undefined'
      ? options.replacement
      : '';
  const output = sanitize(input, replacement);
  if (replacement === '') {
    return output;
  }
  return sanitize(output, '');
}
