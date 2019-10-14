import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from 'components/content/home';
import Flights from 'components/content/flights';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      exact
      path="/flights/:tripType/:from/:to/:outboundDate/:inboundDate/:adults/:children/:infants/:cabin"
      component={Flights}
    />
    <Route
      exact
      path="/flights/:tripType/:from/:to/:outboundDate/:adults/:children/:infants/:cabin"
      component={Flights}
    />
  </Switch>
);

export default Routes;
