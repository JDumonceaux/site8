import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { update } from '../../state/examples/formExample1Slice';
import { AppDispatch, RootState } from '../../state/store';

export const useFormExample1 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.form);

  const dispatchUpdate = useCallback(
    (fieldName: string, value: string) => {
      const x = { ...data, [fieldName]: value };
      dispatch(update(x));
    },
    [data, dispatch],
  );

  console.log('data', data);

  return {
    data,
    update: dispatchUpdate,
  };
};

export default useFormExample1;
