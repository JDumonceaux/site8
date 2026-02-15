export const removeItem = <T>(arr: readonly T[], value: T): T[] => {
  return arr.filter((item) => item !== value);
};
