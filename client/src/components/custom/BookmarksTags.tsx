import React from 'react';
import { BookmarksTags } from 'types';

type BookmarksTagsProps = {
  readonly data: BookmarksTags | undefined;
};

export const BookmarkTags = ({ data }: BookmarksTagsProps): JSX.Element => {
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
            {item.items?.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};
