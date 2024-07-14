
type GenericListProps<T> = {
  readonly items: T[];
  readonly renderItem:(item: T) => React.ReactNode;
};

const GenericList =  ({ items, renderItem }: GenericListProps<T>): JSX.Element => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

export default GenericList;

