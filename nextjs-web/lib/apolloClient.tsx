import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash-es/isEqual';
import { setContext } from '@apollo/client/link/context';
import { UserService } from '../utils/services/userService';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

const isServer = typeof window === 'undefined';
let apolloClient: ApolloClient<any>;

const httpLink = createHttpLink({
  uri: process.env.hasuraUrl
});

const authLink = setContext((_, { headers }) => {
  const token = UserService.getUser()?.token;
  return {
    headers: token
      ? {
          ...headers,
          Authorization: `Bearer ${token}`
        }
      : headers
  };
});

function createApolloClient() {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode: isServer
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        )
      ]
    });

    _apolloClient.cache.restore(data);
  }
  if (isServer) return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}
