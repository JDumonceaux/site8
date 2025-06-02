import { type JSX, Fragment } from 'react';
import type { BookmarksTags } from 'types/BookmarksTags';

type BookmarksTagsProps = {
  readonly data: BookmarksTags | undefined;
};

// Render bookmark tags table
export const BookmarkTags = ({
  data,
}: BookmarksTagsProps): JSX.Element | null => {
  return (
    <table>
      <thead>
        <tr>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {data?.items?.map((item) => (
          <Fragment key={item.tag}>
            <tr key={item.tag}>
              <td>{item.tag}</td>
              <td />
            </tr>
            {item.items.map((x) => (
              <tr key={x.id}>
                <td>{x.name}</td>
                <td>{x.description}</td>
              </tr>
            ))}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default BookmarkTags;
