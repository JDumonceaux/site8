import { useCallback, useState } from 'react';

import { FORM_CONSTANTS } from '@lib/utils/constants';
import type { TestCode } from '@site8/shared';

type UseCodeItemsManagerResult = {
  readonly codeItems: TestCode[];
  readonly handleAddCode: () => void;
  readonly handleDeleteCode: (id: number) => void;
  readonly handleMoveCodeDown: (index: number) => void;
  readonly handleMoveCodeUp: (index: number) => void;
  readonly handleUpdateCode: (
    id: number,
    field: keyof TestCode,
    value: string,
  ) => void;
};

export const useCodeItemsManager = (
  initialCode: readonly TestCode[] = [],
): UseCodeItemsManagerResult => {
  const [codeItems, setCodeItems] = useState<TestCode[]>([...initialCode]);

  const handleAddCode = useCallback(() => {
    setCodeItems((current) => {
      const maxId = current.reduce((max, code) => Math.max(max, code.id), 0);
      const maxSeq = current.reduce((max, code) => Math.max(max, code.seq), 0);

      return [
        ...current,
        {
          content: '',
          id: maxId + 1,
          seq: maxSeq + 1,
          type: FORM_CONSTANTS.DEFAULT_CODE_TYPE,
        },
      ];
    });
  }, []);

  const handleDeleteCode = useCallback((id: number) => {
    setCodeItems((current) => current.filter((code) => code.id !== id));
  }, []);

  const handleMoveCodeUp = useCallback((index: number) => {
    setCodeItems((current) => {
      if (index === 0) return current;
      const newCodeItems = [...current];
      [newCodeItems[index - 1], newCodeItems[index]] = [
        newCodeItems[index],
        newCodeItems[index - 1],
      ];
      return newCodeItems;
    });
  }, []);

  const handleMoveCodeDown = useCallback((index: number) => {
    setCodeItems((current) => {
      if (index === current.length - 1) return current;
      const newCodeItems = [...current];
      [newCodeItems[index], newCodeItems[index + 1]] = [
        newCodeItems[index + 1],
        newCodeItems[index],
      ];
      return newCodeItems;
    });
  }, []);

  const handleUpdateCode = useCallback(
    (id: number, field: keyof TestCode, value: string) => {
      setCodeItems((current) =>
        current.map((code) =>
          code.id === id ? { ...code, [field]: value } : code,
        ),
      );
    },
    [],
  );

  return {
    codeItems,
    handleAddCode,
    handleDeleteCode,
    handleMoveCodeDown,
    handleMoveCodeUp,
    handleUpdateCode,
  };
};
