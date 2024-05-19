export const getDateTime = (date?: string, delimiter = '/') => {
  // 4/4/2024 7:50 PM
  if (date) {
    const [datePart, timePart] = date.split(' ');
    const [month, day, year] = datePart.split(delimiter).map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    const isPM = date.includes('PM') || date.includes('pm');
    const adjustedHours = isPM ? hours + 12 : hours;
    return new Date(year, month - 1, day, adjustedHours, minutes);
  }
  return null;
};
