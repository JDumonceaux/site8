import { Bookmarks } from 'types/Bookmarks';

type BookmarksProps = {
  readonly id?: number;
  readonly data?: Bookmarks | null;
};

export const BookmarkList = ({
  id,
  data,
}: BookmarksProps): React.JSX.Element | null => {
  if (!data) {
    return null;
  }

  return (
    <>
      {id ? <div>{id}</div> : null}
      {data?.items?.map((item) => (
        <div key={item.id}>
          <h3>
            <a href={`${item.url}`}>{item.name}</a>
          </h3>
          <p>{item.description}</p>
        </div>
      ))}
    </>
  );
};
