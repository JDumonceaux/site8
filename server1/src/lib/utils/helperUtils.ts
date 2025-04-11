export function parseRequestId(value: string | undefined) {
  let isValid = false;
  let id: number | undefined;

  if (value) {
    id = parseInt(value);
    isValid = !Number.isNaN(id) && id !== 0;
  }

  return { isValid, id };
}
// Array.isArray(), checks whether its argument is an array.
// This weeds out values like null,
// undefined and anything else that is not an array.
// arr.length condition checks whether the
// variable's length property evaluates to a truthy value.
export const isValidArray = (arr: unknown[] | undefined) => {
  if (!Array.isArray(arr) || !arr.length) {
    return false;
  }
  return true;
};

export function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
