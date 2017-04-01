import constants from './constants/constants';

export function createPromise(url, requestType, ...data) {
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open(requestType || 'GET', url);
		if(requestType === 'POST' && data.length) {
			xhr.setRequestHeader("Content-type", "application/json");
		}
		xhr.onload = function() {
			if(xhr.status === 200) {
				resolve(xhr.response);
			} 
			else {
				reject(xhr.statusText);
			}
		}

		xhr.onerror = function() {
			reject('A network error occured.');
		}

		if(data.length) {
			xhr.send(data[0])
		}
		else{ 
			xhr.send();
		}
	});
}
export function getInitialStore() {
	return createPromise(constants.urls.BASE_URL + constants.urls.GET_URL);
};

export function updateStore(updateObject) {
	return createPromise(
		constants.urls.BASE_URL + constants.urls.POST_URL,
		'POST',
		updateObject
		);
};

export function customAction(type, ...argNames) {
  return function(...args) {
    let action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    })
    return action;
  }
};

export function customReducer(initialState, handlers) {
	return function(state = initialState, action) {
		if(handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action);
		}
		else {
			return state;
		}
	}
}; 
