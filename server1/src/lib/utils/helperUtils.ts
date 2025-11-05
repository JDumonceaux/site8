type ParseIdResult = {
  readonly isValid: boolean;
  readonly id: number | undefined;
};

export const parseRequestId = (value: string | undefined): ParseIdResult => {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return { isValid: false, id: undefined };
  }

  const id = Number(trimmedValue);
  const isValid = !Number.isNaN(id) && id > 0 && Number.isInteger(id);

  return { isValid, id: isValid ? id : undefined };
};

export const isValidArray = (arr: unknown[] | undefined): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};

export const removeItem = <T>(arr: readonly T[], value: T): readonly T[] => {
  return arr.filter((item) => item !== value);
};
