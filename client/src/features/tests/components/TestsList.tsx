import type { JSX } from 'react';

import type { Test } from '@site8/shared';

import { TestList, TestsContainer } from '../TestsPage.styles';
import TestItem from './TestItem';

type TestsListProps = {
  readonly error?: Error | null;
  readonly items: readonly Test[];
  readonly itemGroupIdMap: ReadonlyMap<number, number>;
  readonly onEditItem: (item: Test, groupId: number) => void;
};

const TestsList = ({
  error,
  items,
  itemGroupIdMap,
  onEditItem,
}: TestsListProps): JSX.Element => {
  if (items.length === 0) {
    return (
      <TestsContainer>
        {error ? 'Failed to fetch' : 'No tests match the current filters.'}
      </TestsContainer>
    );
  }

  return (
    <TestsContainer>
      <TestList>
        {items.map((item) => (
          <TestItem
            groupId={itemGroupIdMap.get(item.id) ?? 1}
            item={item}
            key={item.id}
            onEdit={onEditItem}
          />
        ))}
      </TestList>
    </TestsContainer>
  );
};

export default TestsList;
