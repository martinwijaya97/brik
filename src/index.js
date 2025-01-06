import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import { ApolloProvider, ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { BatchHttpLink } from '@apollo/client/link/batch-http';

import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import App from './core/App';

import SignIn from '../src/features/auth/pages/SignIn';

import './index.css';
import getFirstValidationErrorMessage from './core/utils/getFirstValidationErrorMessage';
import useGlobal from './globalStore';

const isDevelopment = process.env.NODE_ENV === 'development';

const globalTheme = createTheme({
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
});

const browserHistory = createBrowserHistory();

let showErrorMessageFunction = null;
let logoutFunction = null;

const { REACT_APP_GRAPHQL_API_URL } = process.env;

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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  let shouldLogout = false;
  if (graphQLErrors) {
    const logoutErrors = ['SESSION_EXPIRED', 'INVALID_TOKEN', 'NOT_AUTHENTICATED', 'session expired'];

    shouldLogout = graphQLErrors.some(({ message }) => {
      alert(message);
      return logoutErrors.some((error) => message.toLowerCase().includes(error.toLowerCase()));
    });

    const firstErrorJoiValidationServer = getFirstValidationErrorMessage(graphQLErrors);
    // showErrorMessageFunction(firstErrorJoiValidationServer);

    if (shouldLogout) {
      logoutFunction();
    }
  }

  if (networkError) {
    if (networkError.statusCode === 401) {
      logoutFunction();
    } else {
      // showErrorMessageFunction(networkError.message);
    }
  }
});

const consoleLink = new ApolloLink((operation, forward) => {
  operation.setContext({ start: new Date() });
  console.groupCollapsed(`Starting request for ${operation.operationName}`);

  console.groupEnd();

  return forward(operation).map((data) => {
    const time = new Date() - operation.getContext().start;

    console.groupCollapsed(`End request for ${operation.operationName} in ${time}ms`);

    console.groupEnd();

    return data;
  });
});

const retryLink = new RetryLink({
  delay: {
    initial: 2000,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    retryIf: (error, { query }) => Boolean(error) && /^query$/i.test(query?.definitions[0]?.operation),
  },
});

const requestLink = new BatchHttpLink({
  uri: REACT_APP_GRAPHQL_API_URL,
});

const link = ApolloLink.from(
  [retryLink, authLink, isDevelopment && consoleLink, errorLink, requestLink].filter(Boolean)
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

function IsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [state] = useGlobal(); //
  const token = state.auth.token;

  const [authState, authActions] = useGlobal(
    (state) => state.auth,
    (actions) => actions.auth
  );
  logoutFunction = () => {
    authActions.clearAuthCache();
  };

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  return isLoggedIn ? <App /> : <SignIn />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={globalTheme}>
    <Router history={browserHistory}>
      <ApolloProvider client={gqlClient}>
        <IsLoggedIn />
      </ApolloProvider>
    </Router>
  </ThemeProvider>
);
