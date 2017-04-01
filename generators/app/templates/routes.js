import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { HomeContainer } from '../containers/HomeContainer';
import { CoreLayout } from '../layouts/CoreLayout';
<%= imports %>

const routes = (
	<Route path="/" component={CoreLayout}>
      <IndexRoute component={HomeContainer} />
      <Route path='Home' component={HomeContainer} />
      <%= routes %>
    </Route>
);

export default routes;