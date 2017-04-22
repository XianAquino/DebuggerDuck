import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Main from './Main.js';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Group from './pages/Group';
import NotFound from './pages/NotFound';

const RouterComponent = () => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={Home} />
        <Route path='group/:groupId' component={Group} />
        <Route path='profile/:username' component={Profile} />
      </Route>
      <Route path='/*' component={NotFound} />
    </Router>
  );
};

export default RouterComponent;
