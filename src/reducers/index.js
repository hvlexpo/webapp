import { combineReducers } from 'redux'
import votesReducer from './votesReducer'
import exhibitionsReducer from './exhibitionsReducer'
import userReducer from './userReducer'
import tokenReducer from './tokenReducer'

export default combineReducers({
	votes: votesReducer,
	exhibitions: exhibitionsReducer,
	user: userReducer,
	token: tokenReducer
})
