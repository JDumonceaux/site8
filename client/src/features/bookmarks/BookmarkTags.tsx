import React from 'react';

import type { BookmarksTags } from 'types/BookmarksTags';

type BookmarksTagsProps = {
  readonly data: BookmarksTags | undefined;
};

const BookmarkTags = ({ data }: BookmarksTagsProps): React.JSX.Element => {
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
          <React.Fragment key={item.tag}>
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
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default BookmarkTags;
