import { createContext, useContext } from "react";
import { IUser } from "./Demo";

export const DashboardContext = createContext<IUser | undefined>(undefined);

export function useUserContext() {
  const user = useContext(DashboardContext);

  if (user === undefined) {
    throw new Error("useUserContext must be used with a DashboardContext");
  }

  return user;
}
