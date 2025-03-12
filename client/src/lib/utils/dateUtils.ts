/**
 * Parses a string representation of a date and time and returns a Date object.
 * @param date - The string representation of the date and time.
 * @param delimiter - The delimiter used in the date string. Defaults to '/'.
 * @returns A Date object representing the parsed date and time, or null if the input is invalid.
 */
export const getDateTime = (date?: string, delimiter = '/') => {
  if (!date) {
    return null;
  }

  try {
    const [datePart, timePart] = date.split(' ');
    if (!datePart || !timePart) {
      throw new Error('Invalid date format');
    }

    const [month, day, year] = datePart.split(delimiter).map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    if (
      Number.isNaN(month) ||
      Number.isNaN(day) ||
      Number.isNaN(year) ||
      Number.isNaN(hours) ||
      Number.isNaN(minutes)
    ) {
      throw new TypeError('Invalid date or time values');
    }

    const isPM = /pm/iu.test(date);
    const isAM = /am/iu.test(date);

    const hoursReturnValue = () => {
      if (isPM && hours !== 12) {
        return hours + 12;
      } else if (isAM && hours === 12) {
        return 0;
      }
      return hours;
    };
    const hoursAMPM = hoursReturnValue();

    return new Date(year, month - 1, day, hoursAMPM, minutes);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error parsing date:', error);
    return null;
  }
};
