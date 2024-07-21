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
    let [hours, minutes] = timePart.split(':').map(Number);

    if (
      isNaN(month) ||
      isNaN(day) ||
      isNaN(year) ||
      isNaN(hours) ||
      isNaN(minutes)
    ) {
      throw new Error('Invalid date or time values');
    }

    const isPM = /pm/i.test(date);
    const isAM = /am/i.test(date);

    if (isPM && hours !== 12) {
      hours += 12;
    } else if (isAM && hours === 12) {
      hours = 0;
    }

    return new Date(year, month - 1, day, hours, minutes);
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
};
