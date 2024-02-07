import { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';

import { IItem } from './IItem';

type Props = {
  newItem: IItem;
  setNewItem: (id: string) => void;
  handleSubmit: (id: number) => void;
};

const AddItem = ({ newItem, setNewItem, handleSubmit }: Props) => {
  const inputRef = useRef();

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Item</label>
      <input
        autoFocus
        ref={inputRef}
        id="addItem"
        type="text"
        placeholder="Add Item"
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Add Item"
        onClick={() => inputRef.current.focus()}
      >
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
