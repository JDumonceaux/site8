import { useDeferredValue, useState } from "react";

export default function Demo() {
  const [query, setQuery] = useState("");
  // param to usedDeferredValue must be a primitive
  const deferredQuery = useDeferredValue(query);

  return (
    <div className="tutorial">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <div>{deferredQuery}</div>
    </div>
  );
}
