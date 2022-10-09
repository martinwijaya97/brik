import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from '../src/core/App';

import './index.css';

const browserHistory = createBrowserHistory();
const globalTheme = createTheme({
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
});

render(
  <ThemeProvider theme={globalTheme}>
    <Router history={browserHistory}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
