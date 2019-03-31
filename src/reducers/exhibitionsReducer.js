import { FETCH_EXHIBITIONS } from '../actions/types'

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_EXHIBITIONS:
			return action.payload
		default:
			return state
	}
}
