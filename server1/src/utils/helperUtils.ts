export function parseRequestId(value: string | undefined) {
  let isValid = false;
  let id: number | undefined;

  if (value) {
    id = parseInt(value);
    isValid = !Number.isNaN(id) && id !== 0;
  }

  return { isValid, id };
}
