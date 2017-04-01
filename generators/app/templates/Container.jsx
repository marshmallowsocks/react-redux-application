import { connect } from 'react-redux';
import { <%= pageName %>Action } from '../actions/<%= pageName %>Action';
import <%= pageName %>Component from '../components/<%= pageName %>Component';

const changeText = (text) => {
	return text;
}

const mapStateToProps = (state) => {
	return {
		text: changeText(state.<%= pageName %>.text),
		fullStore: JSON.stringify(state, undefined, 2)
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		onTextChange: (event) => {
			dispatch(<%= pageName %>Action(event.target.value));
		}
	}
}

export const <%= pageName %>Container = connect(
		mapStateToProps,
		mapDispatchToProps
	)(<%= pageName %>Component);

