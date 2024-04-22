import { ReactNode } from 'react';
import {
  ApolloProvider as Provider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';

interface IProps {
  readonly children: ReactNode;
}

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: IProps) => {
  return <Provider client={client}>{children}</Provider>;
};
