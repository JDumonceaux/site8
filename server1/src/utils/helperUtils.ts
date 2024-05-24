export function getRequestIdAsNumeric(value: string | undefined) {
  let isValid = false;
  let id = 0;

  if (value) {
    id = parseInt(value);
    isValid = !(isNaN(id) || id === 0);
  }
  return { isValid, id };
}
