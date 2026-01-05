import { useEffect, useEffectEvent, useRef } from 'react';

const compareInputs = (
  inputKeys: string[],
  oldInputs: Record<string, any>,
  newInputs: Record<string, any>,
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
 * @param inputs - Object with dependencies to monitor
 *
 * @example
 * ```typescript
 * useDependencyDebugger({ user, isLoading, settings });
 * // Console output: "Change detected: isLoading old: false new: true"
 * ```
 */
export const useDependencyDebugger = (inputs: Record<string, any>): void => {
  const oldInputsRef = useRef(inputs);

  const debugInputsEvent = useEffectEvent(() => {
    const oldInputs = oldInputsRef.current;
    const inputKeysArray = Object.keys(inputs);
    compareInputs(inputKeysArray, oldInputs, inputs);
    oldInputsRef.current = inputs;
  });

  useEffect(() => {
    // eslint-disable-next-line react-you-might-not-need-an-effect/no-pass-ref-to-parent
    debugInputsEvent();
  }, [inputs]);
};
