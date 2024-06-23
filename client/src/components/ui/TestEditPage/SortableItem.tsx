import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SortableItemProps = {
  readonly id: number;
  readonly children?: React.ReactNode;
};

export const SortableItem = ({ id, children }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
      {/* <td>item {id}</td>
      <td>
        <TextInput {...getDefaultProps(item.localId, 'name')} />
      </td>
      <td>{item.text}</td>
      <td>{item.type}</td>
      <td>{item.level}</td>
      <td>{item.parentId}</td>
      <td>{item.parentSeq}</td> */}
    </tr>
  );
};
