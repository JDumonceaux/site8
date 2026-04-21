import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
} from 'react';

import type { Place } from '@site8/shared';
import {
  createPlaceFormValues,
  type PlaceFormValues,
} from '../utils/placeFormMapper';

type UseTravelItemFormStateArgs = {
  readonly clearErrors: () => void;
  readonly hasErrors: boolean;
  readonly isOpen: boolean;
  readonly item: null | Place;
};

type UseTravelItemFormStateResult = {
  readonly formValues: PlaceFormValues;
  readonly isFormValid: boolean;
  readonly setTextField: (
    field: Exclude<keyof PlaceFormValues, 'visited'>,
    value: string,
  ) => void;
  readonly setVisited: (value: boolean) => void;
};

export const useTravelItemFormState = ({
  clearErrors,
  hasErrors,
  isOpen,
  item,
}: UseTravelItemFormStateArgs): UseTravelItemFormStateResult => {
  const [formValues, setFormValues] = useState<PlaceFormValues>(() =>
    createPlaceFormValues(item),
  );

  const onSyncFormState = useEffectEvent(() => {
    setFormValues(createPlaceFormValues(item));
    clearErrors();
  });

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-you-might-not-need-an-effect/no-pass-data-to-parent, react-you-might-not-need-an-effect/no-derived-state
      onSyncFormState();
    }
  }, [isOpen, item?.id]);

  const setTextField = useCallback(
    (field: Exclude<keyof PlaceFormValues, 'visited'>, value: string) => {
      setFormValues((current) => ({
        ...current,
        [field]: value,
      }));
    },
    [],
  );

  const setVisited = useCallback((value: boolean) => {
    setFormValues((current) => ({
      ...current,
      visited: value,
    }));
  }, []);

  const isFormValid = useMemo(
    () => formValues.name.trim().length > 0 && !hasErrors,
    [formValues.name, hasErrors],
  );

  return {
    formValues,
    isFormValid,
    setTextField,
    setVisited,
  };
};
