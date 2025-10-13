import { type JSX } from 'react';
import type { BookmarksTags } from 'types/BookmarksTags';

type BookmarksTagsProps = {
  readonly data: BookmarksTags | undefined;
};

// Render bookmark tags table
const BookmarkTags = ({ data }: BookmarksTagsProps): JSX.Element | null => {
  if (!data?.items?.length) return null;

  return (
    <table>
      <thead>
        <tr>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {data.items.flatMap((item) => [
          <tr key={item.tag}>
            <td>{item.tag}</td>
            <td />
          </tr>,
          ...item.items.map((x) => (
            <tr key={x.id}>
              <td>{x.name}</td>
              <td>{x.description}</td>
            </tr>
          )),
        ])}
      </tbody>
    </table>
  );
};

export default BookmarkTags;
