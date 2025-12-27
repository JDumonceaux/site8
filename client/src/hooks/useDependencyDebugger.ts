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

/**
 * Development hook for debugging dependency changes
 *
 * Logs which dependencies changed between renders, helping identify
 * unnecessary re-renders or missing dependencies.
 *
 * **Note:** Only use in development for debugging purposes
 *
 * @template T - Object containing dependencies to track
 * @param inputs - Object with dependencies to monitor
 *
 * @example
 * ```typescript
 * useDependencyDebugger({ user, isLoading, settings });
 * // Console output: "Change detected: isLoading old: false new: true"
 * ```
 */
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
