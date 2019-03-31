import { TOKEN } from '../actions/types'

export default (state = null, action) => {
	switch (action.type) {
		case TOKEN:
			return action.payload
		default:
			return state
	}
}
