import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { store } from './redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@mui/material/styles';
import theme from './core/theme';
// import AppSnackbar from './core/components/AppSnackbar';
// import RemoveModal from './core/components/RemoveModal';
import App from '../src/core/App';

import './index.css';

try {
  const browserHistory = createBrowserHistory();

  render(
    // <ThemeProvider theme={theme}>
    <Router history={browserHistory}>
      <Provider store={store}>
        {/* <RemoveModal /> */}
        <App />;{/* <AppSnackbar /> */}
      </Provider>
    </Router>,
    // </ThemeProvider>,
    document.getElementById('root')
  );
} catch (error) {
  console.error(error);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
