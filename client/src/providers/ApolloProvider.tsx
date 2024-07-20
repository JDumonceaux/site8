import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
} from '@apollo/client';
import { ReactNode } from 'react';
import { ServiceUrl } from 'utils/constants';

type ApolloProviderProps = {
  readonly children: ReactNode;
};

const client = new ApolloClient({
  uri: `${ServiceUrl.ENDPOINT_GRAPHQL_IMAGES}`,
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: ApolloProviderProps) => {
  return <Provider client={client}>{children}</Provider>;
};
