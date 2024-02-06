import { useMemo, useState } from 'react';

import { initialItems } from './data';

export default function Demo() {
  const [count, setCount] = useState(0);
  const [items] = useState(initialItems);

  // Searching 29M items takes time.  This avoids reloads
  const selectedItem = useMemo(
    () => items.find((item) => item.id === count),
    [count, items],
  );

  return (
    <div className="tutorial">
      <h1>Count: {count}</h1>
      <h1>Selected Item: {selectedItem?.id}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
