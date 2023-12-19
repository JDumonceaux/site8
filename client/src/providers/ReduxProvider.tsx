import React from "react";
import { Provider } from "react-redux";

import { store } from "../data/store.ts";

interface IProps {
  children: React.ReactNode;
}

export const ReduxProvider = ({ children }: IProps) => {
  return <Provider store={store}>{children}</Provider>;
};
