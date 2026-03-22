export type ParseIdResult = {
  readonly id: number | undefined;
  readonly isValid: boolean;
};

export const parseId = (value: string | undefined): ParseIdResult => {
  const trimmedValue = value?.trim();
  if (!trimmedValue) {
    return { id: undefined, isValid: false };
  }

  const parsedId = Number(trimmedValue);
  const isValid =
    !Number.isNaN(parsedId) && parsedId > 0 && Number.isInteger(parsedId);

  return { id: isValid ? parsedId : undefined, isValid };
};

export const isValidArray = (array: Iterable<unknown> | undefined): boolean => {
  return Array.isArray(array) && array.length > 0;
};
