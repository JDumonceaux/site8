import type { JSX } from 'react';
import type { Bookmarks } from 'types/Bookmarks';

type BookmarkListProps = {
  readonly data?: Bookmarks | null;
  readonly id?: number;
};

// BookmarkList component displays a list of bookmarks
const BookmarkList = ({
  data,
  id,
}: BookmarkListProps): JSX.Element | null => {
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
