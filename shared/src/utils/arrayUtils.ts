export const removeItem = <T>(array: readonly T[], value: T): T[] => {
  return array.filter((item) => item !== value);
};
