import type { Bookmarks } from 'types/Bookmarks';

type BookmarksProps = {
  readonly data?: Bookmarks | null;
  readonly id?: number;
};

export const BookmarkList = ({
  data,
  id,
}: BookmarksProps): null | React.JSX.Element => {
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
