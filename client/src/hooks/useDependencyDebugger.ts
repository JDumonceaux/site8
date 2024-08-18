import { useMemo, useRef } from 'react';

//https://stackoverflow.com/questions/55187563/determine-which-dependency-array-variable-caused-useeffect-hook-to-fire

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const compareInputs = (inputKeys: any, oldInputs: any, newInputs: any) => {
  //eslint-disable-next-line
  inputKeys.forEach((key: any) => {
    const oldInput = oldInputs[key];
    const newInput = newInputs[key];
    if (oldInput !== newInput) {
      console.log('change detected', key, 'old:', oldInput, 'new:', newInput);
    }
  });
};

//eslint-disable-next-line
export const useDependencyDebugger = (inputs: any) => {
  const oldInputsRef = useRef(inputs);
  const inputValuesArray = Object.values(inputs);
  const inputKeysArray = Object.keys(inputs);
  useMemo(() => {
    const oldInputs = oldInputsRef.current;

    compareInputs(inputKeysArray, oldInputs, inputs);

    oldInputsRef.current = inputs;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputValuesArray);
};

// usage example, will log old/new values when one of the passed params changes
// useDependencyDebugger({dep1, dep2, dep3})
