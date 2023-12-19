import { IItem } from "./IItem";
import ItemList from "./ItemList";

type Props = {
  items?: IItem[];
  handleCheck: (id: number) => void;
  handleDelete: (id: number) => void;
};

const List = ({ items, handleCheck, handleDelete }: Props) => {
  return (
    <main>
      {items?.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is empty.</p>
      )}
    </main>
  );
};

export default List;
