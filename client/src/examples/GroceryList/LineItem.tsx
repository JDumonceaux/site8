import { FaTrashAlt } from "react-icons/fa";
import { IItem } from "./IItem";

type Props = {
  item?: IItem;
  handleCheck: (id: number) => void;
  handleDelete: (id: number) => void;
};

const LineItem = ({ item, handleCheck, handleDelete }: Props) => {
  return item ? (
    <li className="item">
      <input
        type="checkbox"
        onChange={() => handleCheck(item.id)}
        checked={item.checked}
      />
      <label
        style={item.checked ? { textDecoration: "line-through" } : undefined}
        onDoubleClick={() => handleCheck(item.id)}
      >
        {item.item}
      </label>
      <FaTrashAlt
        onClick={() => handleDelete(item.id)}
        role="button"
        tabIndex="0"
        aria-label={`Delete ${item.item}`}
      />
    </li>
  ) : null;
};

export default LineItem;
