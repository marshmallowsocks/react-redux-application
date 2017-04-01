import { customReducer } from '../api';

//write your action cases here.
const handle<%= reducerName %>Action = function(state, action) {
	//no need to switch on action.type, customReducer takes
	//care of that for us
	//just use action.payload or whatever else
	return {
		...state, 
		text: action.payload
	};
}

export const <%= reducerName %>Reducer = customReducer({
		//Pass initial state here
		text: 'Welcome to <%= reducerName %>!'
	},
	{
		'<%= reducerName %>' : handle<%= reducerName %>Action
		//and so forth, add actions and their handlers.	
	});