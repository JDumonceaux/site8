import { ReactNode } from 'react';
import {
  ApolloProvider as Provider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
import { ENDPOINT_GRAPHQL_IMAGES } from 'utils';

interface IProps {
  readonly children: ReactNode;
}

const client = new ApolloClient({
  uri: `${ENDPOINT_GRAPHQL_IMAGES}`,
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: IProps) => {
  return <Provider client={client}>{children}</Provider>;
};
