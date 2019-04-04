import { FETCH_EXHIBITIONS, POST_EXHIBITIONS } from '../actions/types'

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_EXHIBITIONS:
			return action.payload
		case POST_EXHIBITIONS:
			return [...state, action.payload]
		default:
			return state
	}
}
