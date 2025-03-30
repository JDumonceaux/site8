export const getDateTime = (date?: string, delimiter = '/'): Date | null => {
  if (!date) return null;

  try {
    const parts = date.trim().split(' ');
    if (parts.length < 2) {
      throw new Error('Invalid date format');
    }
    const [datePart, timePart] = parts;

    const [month, day, year] = datePart.split(delimiter).map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);

    if ([month, day, year, hours, minutes].some((num) => Number.isNaN(num))) {
      throw new TypeError('Invalid date or time values');
    }

    const lowerDate = date.toLowerCase();
    const isPM = lowerDate.includes('pm');
    const isAM = lowerDate.includes('am');

    let adjustedHours = hours;
    if (isPM && hours !== 12) {
      adjustedHours = hours + 12;
    } else if (isAM && hours === 12) {
      adjustedHours = 0;
    }

    return new Date(year, month - 1, day, adjustedHours, minutes);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error parsing date:', error);
    return null;
  }
};
