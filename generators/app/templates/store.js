import { createStore } from 'redux';
import <%= name %>Reducer from '../reducers/<%= name %>Reducer';

const <%= name %>Store = createStore(<%= name %>Reducer, {
	Home: { text: 'Welcome to Home!'},
	<%= stores %>
});

//Basic subscribe
<%= name %>Store.subscribe(() => {
	console.log('<%= name %>Store changed to:', <%= name %>Store.getState())
});

export default <%= name %>Store;