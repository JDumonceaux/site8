export type ParseIdResult = {
  readonly isValid: boolean;
  readonly id: number | undefined;
};

export const parseId = (value: string | undefined): ParseIdResult => {
  const trimmedValue = value?.trim();
  if (!trimmedValue) {
    return { isValid: false, id: undefined };
  }

  const parsedId = Number(trimmedValue);
  const isValid =
    !Number.isNaN(parsedId) && parsedId > 0 && Number.isInteger(parsedId);

  return { isValid, id: isValid ? parsedId : undefined };
};

export const isValidArray = (arr: Iterable<unknown> | undefined): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};
