import { FETCH_VOTES, POST_VOTES } from '../actions/types'

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_VOTES:
			return action.payload
		case POST_VOTES:
			return [...state, action.payload]
		default:
			return state
	}
}
