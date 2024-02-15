import React from 'react';

interface SearchProps {
  onChange: (text: string) => void;
}

const Search = React.memo(function Search({ onChange }: SearchProps) {
  return (
    <input
      type="text"
      placeholder="Search users..."
      onChange={(e) => onChange(e.target.value)}
    />
  );
});

export default Search;
