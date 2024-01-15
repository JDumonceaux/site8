import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { update } from "../../state/examples/formExample1Slice";
import { useCallback } from "react";

export const useFormExample1 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.form);

  const dispatchUpdate = useCallback(
    (fieldName: string, value: string) => {
      const x = { ...data, [fieldName]: value };
      console.log("X", x);
      dispatch(update(x));
    },
    [data, dispatch]
  );

  console.log("data", data);

  return {
    data,
    update: dispatchUpdate,
  };
};

export default useFormExample1;
