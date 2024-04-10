import { Bookmarks } from 'services/types/Bookmarks';

type BookmarksProps = {
  readonly id?: number;
  readonly data?: Bookmarks | null;
};

export const BookmarkList = ({ id, data }: BookmarksProps): JSX.Element => {
  return (
    <>
      <div>{id}</div>
      {data?.items?.map((item) => (
        <div key={item.id}>
          <h3>
            <a href="${item.url}">{item.name}</a>
          </h3>
          <p>{item.description}</p>
        </div>
      ))}
    </>
  );
};
