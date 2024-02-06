import { useLayoutEffect, useState } from 'react';

const userIds = [1, 2];

const Demo = () => {
  const [userId, setUserId] = useState(userIds[0]);
  const [isAdmin, setIsAdmin] = useState(false);

  // This artificially slows down rendering
  const now = performance.now();
  while (performance.now() - now < 200) {
    // Do nothing for a bit...
  }

  // useEffect is asynchronous - i.e. it happens whenever.
  // As a result, using useEffect results in 2 renders of the screen
  // useEffect(() => {
  //   setIsAdmin(userId === userIds[0]);
  // }, [userId]);

  // useLayoutEffect is synchronous - it blocks rendering until setIsAdmin is
  // complete.  As a result - there is only 1 render and both values
  // appear to update at once.
  useLayoutEffect(() => {
    setIsAdmin(userId === userIds[0]);
  }, [userId]);

  const handleChange = () => {
    const otherId = userIds.find((id) => id !== userId)!;
    setUserId(otherId);
  };

  return (
    <div className="tutorial-shorts">
      <p>userId: {userId}</p>
      <p>Admin: {isAdmin}</p>
      <button title="Change User" onClick={handleChange} />
    </div>
  );
};

export default Demo;
