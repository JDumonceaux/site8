type LengthObject = {
  unit: string;
  value: number;
};

const cssUnit: Record<string, boolean> = {
  '%': true,
  ch: true,
  cm: true,
  em: true,
  ex: true,
  in: true,
  mm: true,
  pc: true,
  pt: true,
  px: true,
  rem: true,
  vh: true,
  vmax: true,
  vmin: true,
  vw: true,
};

/**
 * If size is a number, append px to the value as default unit.
 * If size is a string, validate against list of valid units.
 * If unit is valid, return size as is.
 * If unit is invalid, console warn issue, replace with px as the unit.
 *
 * @param {(number | string)} size
 * @return {LengthObject} LengthObject
 */
export const parseLengthAndUnit = (size: number | string): LengthObject => {
  if (typeof size === 'number') {
    return {
      unit: 'px',
      value: size,
    };
  }
  let value: number;
  const valueString: string = (/^[\d.]*/.exec(size) ?? '').toString();
  value = valueString.includes('.')
    ? Number.parseFloat(valueString)
    : Number.parseInt(valueString, 10);

  const unit: string = (/\D*$/.exec(size) ?? '').toString();

  if (cssUnit[unit]) {
    return {
      unit,
      value,
    };
  }

  console.warn(
    `React Spinners: ${size} is not a valid css value. Defaulting to ${value}px.`,
  );

  return {
    unit: 'px',
    value,
  };
};

/**
 * Take value as an input and return valid css value
 *
 * @param {(number | string)} value
 * @return {string} valid css value
 */
export const cssValue = (value: number | string): string => {
  const lengthWithunit = parseLengthAndUnit(value);

  return `${lengthWithunit.value}${lengthWithunit.unit}`;
};
