import { useCallback, useState } from 'react';

import Search from './Search';
import { shuffle } from './shuffle';

const allUsers = ['john', 'alex', 'george', 'simon', 'james'];

export const Demo = (): JSX.Element => {
  const [users, setUsers] = useState(allUsers);

  const handleSearch = useCallback((text: string) => {
    const filteredUsers = allUsers.filter((user) => user.includes(text));
    setUsers(filteredUsers);
  }, []);

  return (
    <div className="tutorial">
      <div className="align-center mb-2 flex">
        <button onClick={() => setUsers(shuffle(allUsers))} type="button">
          Shuffle
        </button>

        <Search onChange={handleSearch} />
      </div>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};
