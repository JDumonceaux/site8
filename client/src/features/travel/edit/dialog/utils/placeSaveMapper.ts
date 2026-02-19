import type { Place } from '@site8/shared';
import type { PlaceFormValues } from './placeFormTransforms';
import { normalizeValues } from './placeFormTransforms';

export const toPlaceToSave = (
  item: null | Place,
  values: PlaceFormValues,
): Place => {
  const normalized = normalizeValues(values);

  if (!item) {
    return {
      ...normalized,
      id: 0,
    };
  }

  return {
    ...item,
    ...normalized,
  };
};
