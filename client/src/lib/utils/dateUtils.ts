import { logError } from './errorHandler';

/**
 * Parses a date-time string in `MM/DD/YYYY hh:mm` format (with optional AM/PM) into a Date.
 * @param dateString - Input string, e.g. "12/31/2023 11:59 PM".
 * @param delimiter  - Delimiter between date parts (default "/").
 * @returns A Date instance or null on invalid input.
 */
export const getDateTime = (
  dateString?: string,
  delimiter = '/',
): Date | null => {
  if (dateString == null || dateString.trim() === '') {
    console.warn(`getDateTime: empty input`);
    return null;
  }

  const raw = dateString.trim();
  const match = parseDateTimeString(raw, delimiter);
  if (match == null) return null;

  const parts = extractParts(match);
  if (parts == null) return null;

  parts.hour = adjustHour(parts.hour, parts.meridiem);
  if (!validateParts(parts)) return null;

  return buildDate(parts);
};

// ——— Helpers ———

/** Cache for regex patterns by delimiter */
const regexCache = new Map<string, RegExp>();

/** Split raw string via regex, return match groups or null */
const parseDateTimeString = (
  raw: string,
  delim: string,
): null | RegExpExecArray => {
  let re = regexCache.get(delim);
  if (re == null) {
    const escapedDelim = delim.replaceAll(
      /[$()*+.?[\\\]^{|}]/g,
      String.raw`\$&`,
    );
    const pattern = String.raw`^(\d{1,2})${escapedDelim}(\d{1,2})${escapedDelim}(\d{4})\s+(\d{1,2}):(\d{2})(?:\s*([AaPp][Mm]))?$`;
    // eslint-disable-next-line security/detect-non-literal-regexp -- delimiter is escaped above
    re = new RegExp(pattern, 'u');
    regexCache.set(delim, re);
  }
  const m = re.exec(raw);
  if (m == null) {
    logError(
      new Error(`Format mismatch for "${raw}"`),
      { componentName: 'getDateTime', operation: 'parseRawString' },
      'warning',
    );
  }
  return m;
};

/** Turn regex groups into numeric parts */
const extractParts = (
  matches: RegExpExecArray,
): null | {
  day: number;
  hour: number;
  meridiem?: string;
  minute: number;
  month: number;
  year: number;
} => {
  const [, mStr, dStr, yStr, hStr, minStr, mer] = matches;
  const month = Number(mStr);
  const day = Number(dStr);
  const year = Number(yStr);
  const hour = Number(hStr);
  const minute = Number(minStr);

  if ([month, day, year, hour, minute].some(Number.isNaN)) {
    logError(
      new Error('Non-numeric value in date string'),
      {
        componentName: 'getDateTime',
        day,
        hour,
        minute,
        month,
        operation: 'extractParts',
        year,
      },
      'warning',
    );
    return null;
  }

  return { day, hour, meridiem: mer, minute, month, year };
};

/** Adjust 12-hour clock hour based on AM/PM indicator */
const adjustHour = (hour: number, meridiem?: string): number => {
  if (meridiem == null || meridiem === '') return hour;
  const ampm = meridiem.toLowerCase();
  if (ampm === 'pm' && hour < 12) return hour + 12;
  if (ampm === 'am' && hour === 12) return 0;
  return hour;
};

/** Ensure each part is within its valid range */
const validateParts = (parts: {
  day: number;
  hour: number;
  minute: number;
  month: number;
}): parts is {
  day: number;
  hour: number;
  minute: number;
  month: number;
} => {
  const { day, hour, minute, month } = parts;
  const ok =
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= 31 &&
    hour >= 0 &&
    hour <= 23 &&
    minute >= 0 &&
    minute <= 59;
  if (!ok) {
    logError(
      new Error('Out-of-range date value'),
      { componentName: 'getDateTime', operation: 'isValidRange', parts },
      'warning',
    );
  }
  return ok;
};

/** Build the JS Date (months are 0-based) */
const buildDate = (parts: {
  day: number;
  hour: number;
  minute: number;
  month: number;
  year: number;
}): Date =>
  new Date(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);
