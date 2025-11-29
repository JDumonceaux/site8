import { useEffect, useEffectEvent, useRef } from 'react';

const compareInputs = <T extends Record<string, any>>(
  inputKeys: (keyof T)[],
  oldInputs: T,
  newInputs: T,
): void => {
  for (const key of inputKeys) {
    if (oldInputs[key] !== newInputs[key]) {
      console.log(
        'Change detected:',
        key,
        'old:',
        oldInputs[key],
        'new:',
        newInputs[key],
      );
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const useDependencyDebugger = <T extends Record<string, any>>(
  inputs: T,
): void => {
  const oldInputsRef = useRef(inputs);

  const debugInputsEvent = useEffectEvent(() => {
    const oldInputs = oldInputsRef.current;
    const inputKeysArray = Object.keys(inputs) as (keyof T)[];
    compareInputs(inputKeysArray, oldInputs, inputs);
    oldInputsRef.current = inputs;
  });
  useEffect(() => {
    debugInputsEvent();
  }, [inputs]);
};
