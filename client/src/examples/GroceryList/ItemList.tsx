import LineItem from "./LineItem";
import { IItem } from "./IItem";

type Props = {
  items: IItem[];
  handleCheck: (id: number) => void;
  handleDelete: (id: number) => void;
};

const ItemList = ({ items, handleCheck, handleDelete }: Props) => {
  return (
    <ul>
      {items.map((item) => (
        <LineItem
          key={item.id}
          item={item}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ItemList;
