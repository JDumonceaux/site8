import React from 'react';

interface SearchProps {
  readonly onChange: (text: string) => void;
}

const Search = React.memo(({ onChange }: SearchProps) => (
  <input
    onChange={(e) => onChange(e.target.value)}
    placeholder="Search users..."
    type="text"
  />
));

Search.displayName = 'Search';

export default Search;
