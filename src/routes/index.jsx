import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Clients from '../pages/Clients';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />

      <Route path="/dashboard" component={Dashboard} />
      <Route path="/clients" component={Clients} />
    </Switch>
  );
}

export default Routes;