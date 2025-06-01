import type { Bookmarks } from 'types/Bookmarks';

type BookmarkListProps = {
  readonly data?: Bookmarks | null;
  readonly id?: number;
};

const BookmarkList: React.FC<BookmarkListProps> = ({
  data,
  id,
}: BookmarkListProps): null | JSX.Element => {
  if (!data) {
    return null;
  }

  return (
    <>
      {id ? <div>{id}</div> : null}
      {data.items.map((item) => (
        <div key={item.id}>
          <h3>
            <a href={item.url}>{item.name}</a>
          </h3>
          <p>{item.description}</p>
        </div>
      ))}
    </>
  );
};

BookmarkList.displayName = 'BookmarkList';

export default BookmarkList;
