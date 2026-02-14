import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
} from 'react';

import type { Test, TestCode } from '@site8/shared';
import { formatTags } from '../utils';

type UseTestItemFormStateArgs = {
  readonly clearErrors: () => void;
  readonly defaultGroupId: number;
  readonly groupId: null | number;
  readonly hasErrors: boolean;
  readonly isOpen: boolean;
  readonly item: null | Test;
  readonly resetCodeItems: (nextCodeItems?: readonly TestCode[]) => void;
};

type UseTestItemFormStateResult = {
  readonly comments: string;
  readonly handleGroupChange: (value: string) => void;
  readonly isFormValid: boolean;
  readonly name: string;
  readonly selectedGroupId: number;
  readonly setComments: (value: string) => void;
  readonly setName: (value: string) => void;
  readonly setTags: (value: string) => void;
  readonly tags: string;
};

export const useTestItemFormState = ({
  clearErrors,
  defaultGroupId,
  groupId,
  hasErrors,
  isOpen,
  item,
  resetCodeItems,
}: UseTestItemFormStateArgs): UseTestItemFormStateResult => {
  const [name, setNameState] = useState(item?.name ?? '');
  const [selectedGroupId, setSelectedGroupId] = useState<number>(
    groupId ?? defaultGroupId,
  );
  const [comments, setCommentsState] = useState(item?.comments ?? '');
  const [tags, setTagsState] = useState(formatTags(item?.tags));

  const onSyncFormState = useEffectEvent(() => {
    setNameState(item?.name ?? '');
    setCommentsState(item?.comments ?? '');
    setTagsState(formatTags(item?.tags));
    setSelectedGroupId(groupId ?? defaultGroupId);
    resetCodeItems(item?.code ?? []);
    clearErrors();
  });

  useEffect(() => {
    if (isOpen) {
      onSyncFormState();
    }
  }, [defaultGroupId, groupId, isOpen, item?.id]);

  const isFormValid = useMemo(
    () => name.trim().length > 0 && selectedGroupId > 0 && !hasErrors,
    [name, selectedGroupId, hasErrors],
  );

  const handleGroupChange = useCallback((value: string) => {
    setSelectedGroupId(Number(value));
  }, []);

  const setName = useCallback((value: string) => {
    setNameState(value);
  }, []);

  const setComments = useCallback((value: string) => {
    setCommentsState(value);
  }, []);

  const setTags = useCallback((value: string) => {
    setTagsState(value);
  }, []);

  return {
    comments,
    handleGroupChange,
    isFormValid,
    name,
    selectedGroupId,
    setComments,
    setName,
    setTags,
    tags,
  };
};
