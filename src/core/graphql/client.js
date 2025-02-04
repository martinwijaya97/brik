import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { createConsoleLink } from './links/consoleLink';
import { handleError } from './links/errorHandler';

const { REACT_APP_GRAPHQL_API_URL, NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === 'development';

if (!REACT_APP_GRAPHQL_API_URL) {
  console.error('REACT_APP_GRAPHQL_API_URL is not defined');
}

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const retryLink = new RetryLink({
  delay: { initial: 2000, max: Infinity, jitter: true },
  attempts: { retryIf: (error, { query }) => Boolean(error) && /^query$/i.test(query?.definitions[0]?.operation) },
});

const requestLink = new BatchHttpLink({ uri: REACT_APP_GRAPHQL_API_URL });

const link = ApolloLink.from(
  [retryLink, authLink, isDevelopment && createConsoleLink(), handleError(), requestLink].filter(Boolean)
);

export const gqlClient = new ApolloClient({
  connectToDevTools: isDevelopment,
  queryDeduplication: true,
  cache: new InMemoryCache(),
  link,
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});
