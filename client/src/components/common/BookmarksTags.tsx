import React from 'react';
import { BookmarksTags } from 'services/types';

type BookmarksTagsProps = {
  readonly data?: BookmarksTags | null;
};

export const BookmarkTags = ({ data }: BookmarksTagsProps): JSX.Element => {
  return (
    <div className="loading-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Area</th>
            <th>Subarea</th>
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
    </div>
  );
};
