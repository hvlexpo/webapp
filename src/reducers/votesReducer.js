import { FETCH_VOTES } from '../actions/types'

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_VOTES:
			return action.payload
		default:
			return state
	}
}
