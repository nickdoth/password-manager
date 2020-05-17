import React from 'react';
import './App.css';

import PasswordListPage from './containers/PasswordListPage';
import PasswordUpdatePage from './containers/PasswordUpdatePage';
import { Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

const App: React.FC = () => {
  return <Router history={history}>
    <Route exact path="/" component={PasswordListPage} />
    <Route path="/password/:id" component={PasswordUpdatePage} />
    {/* </Route> */}
  </Router>;
}

export default App;
