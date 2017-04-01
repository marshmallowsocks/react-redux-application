//Implement your reducers in separate files, combine them here.
import { combineReducers } from 'redux'; 
import { HomeReducer } from '../reducers/HomeReducer';
<%= imports %>

const <%= name %>Reducer = combineReducers({
	Home: HomeReducer,
	<%= reducers %>
});

//Export the object
export default <%= name %>Reducer;