import React from 'react';
import './App.css';

import PasswordListPage from './containers/PasswordListPage';
import PasswordUpdatePage from './containers/PasswordUpdatePage';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';
import { ThemeProvider, Theme, createMuiTheme, colors } from '@material-ui/core';

const history = createMemoryHistory();

export const appTheme: Theme = createMuiTheme({
  palette: {
    warning: {
      dark: colors.yellow[900],
      main: colors.yellow[900],
      light: colors.yellow[900],
    },
  },
});

const App: React.FC = () => {
  return <Router history={history}>
    <Route exact path="/" component={PasswordListPage} />
    <Route path="/password/:id" component={PasswordUpdatePage} />
    {/* </Route> */}
  </Router>;
}

export default () => <ThemeProvider theme={appTheme}><App /></ThemeProvider>;
