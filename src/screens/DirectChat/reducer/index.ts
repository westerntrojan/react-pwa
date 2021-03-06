import * as types from './types';

export const initialState: types.State = {
	messages: [],
	endMessages: false,
	loading: true,
	scrollDown: true,
	typing: false,
	error: false,
};

export default (state: types.State, action: types.Action): types.State => {
	switch (action.type) {
		case types.PRE_MESSAGES:
			return {
				...state,
				loading: false,
				messages: action.payload.messages,
			};
		case types.NEW_MESSAGE:
			return {
				...state,
				scrollDown: false,
				messages: state.messages.concat(action.payload.message),
			};
		case types.NEW_MESSAGE_FROM_ME:
			return {
				...state,
				scrollDown: true,
				messages: state.messages.concat(action.payload.message),
			};
		case types.REMOVE_MESSAGES:
			return {
				...state,
				scrollDown: false,
				messages: state.messages.filter(message => !action.payload.messages.includes(message._id)),
			};
		case types.LOAD_MORE:
			return {
				...state,
				scrollDown: false,
				messages: action.payload.messages.concat(state.messages),
				endMessages: !action.payload.messages.length,
			};
		case types.TYPING:
			return {
				...state,
				typing: true,
			};
		case types.TYPING_END:
			return {
				...state,
				typing: false,
			};
		case types.ERROR:
			return {
				...state,
				error: true,
				loading: false,
			};
		default:
			return state;
	}
};
