import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import CreateEstablishment from '../pages/CreateEstablishment';
import EstablishmentDetails from '../pages/EstablishmentDetails';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/home" isPrivate component={Home} />
    <Route
      path="/create-establishment"
      isPrivate
      component={CreateEstablishment}
    />
    <Route
      path="/establishment-details"
      isPrivate
      component={EstablishmentDetails}
    />

    <Route
      path="*"
      component={() => <h1>404 - Página não encontrada!</h1>}
      isPrivate
    />
  </Switch>
);

export default Routes;
