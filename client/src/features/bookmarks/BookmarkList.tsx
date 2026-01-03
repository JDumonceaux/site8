import { type JSX, memo } from 'react';

import styled from 'styled-components';

type BookmarkItem = {
  description?: null | string;
  id: number | string;
  name: string;
  url: string;
};

type Bookmarks = {
  items?: BookmarkItem[];
};

type BookmarkListProps = {
  readonly data?: Bookmarks | null;
  readonly id?: number;
};

// BookmarkList component displays a list of bookmarks
const BookmarkList = memo(
  ({ data, id }: BookmarkListProps): JSX.Element | null => {
    if (!data) {
      return null;
    }

    return (
      <>
        {id ? <div>{id}</div> : null}
        {data.items?.map((item) => (
          <div key={item.id}>
            <StyledHeading>
              <a href={item.url}>{item.name}</a>
            </StyledHeading>
            <p>{item.description}</p>
          </div>
        ))}
      </>
    );
  },
);

BookmarkList.displayName = 'BookmarkList';

export default BookmarkList;

const StyledHeading = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 0.25em 0;
  font-weight: 600;
`;
