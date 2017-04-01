import { customAction } from '../api';

export const <%= actionName %>Action = customAction(
	'<%= actionName %>', //Action type
	'payload'
	//you can add more items here, customAction accepts multiple args.
);

