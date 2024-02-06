import { useState } from 'react';

import { DashboardContext } from './context';
import Dashboard from './Dashboard';

export interface IUser {
  isSubscribed: boolean;
  name: string;
}

export default function Demo() {
  const [user] = useState<IUser>({
    isSubscribed: true,
    name: 'You',
  });

  return (
    <div>
      <DashboardContext.Provider value={user}>
        <Dashboard />
      </DashboardContext.Provider>
    </div>
  );
}
