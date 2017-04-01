import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes/routes';
import <%= name %>Store from './store/<%= name %>Store'; 
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

ReactDOM.render((
	<Provider store={<%= name %>Store}>
		<Router history={browserHistory}>
			{routes}
		</Router>
	</Provider>
), document.getElementById('root'))