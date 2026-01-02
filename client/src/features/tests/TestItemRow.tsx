import type { JSX } from 'react';

import Input from '@components/ui/input/Input';
import SortableItem from '@features/tests/SortableItem';

type TestItemRowProps = {
  readonly getDefaultProps: (
    lineId: number,
    field: string,
  ) => {
    id: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
  };
  readonly item: {
    id: number;
    level?: number;
    lineId: number;
    name: string;
    parent: { id: number; seq: number };
    projectType?: number;
    text: string;
    type?: number;
  };
};

/**
 * Renders a single test item row with all editable fields.
 * Wrapped in SortableItem for drag-and-drop functionality.
 */
const TestItemRow = ({
  getDefaultProps,
  item,
}: TestItemRowProps): JSX.Element => {
  return (
    <SortableItem
      id={item.lineId}
      key={item.lineId}
    >
      <td>{item.id}</td>
      <td>
        <Input.Text {...getDefaultProps(item.lineId, 'name')} />
      </td>
      <td>
        <Input.Text {...getDefaultProps(item.lineId, 'text')} />
      </td>
      <td>
        <Input.Text {...getDefaultProps(item.lineId, 'type')} />
      </td>
      <td>
        <Input.Text {...getDefaultProps(item.lineId, 'level')} />
      </td>
      <td>
        <Input.Text {...getDefaultProps(item.lineId, 'parentId')} />
      </td>
      <td>
        <Input.Text {...getDefaultProps(item.lineId, 'parentSeq')} />
      </td>
      <td>
        <Input.Text {...getDefaultProps(item.lineId, 'projectType')} />
      </td>
      <td>
        <Input.Text {...getDefaultProps(item.lineId, 'action')} />
      </td>
    </SortableItem>
  );
};

TestItemRow.displayName = 'TestItemRow';
export default TestItemRow;
