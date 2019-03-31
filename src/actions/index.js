import axios from 'axios'
import { FETCH_USER, FETCH_EXHIBITIONS, FETCH_VOTES, TOKEN } from './types'

export const fetchUser = token => async dispatch => {
	const res = await axios.get('/users/user', {
		headers: { firebasetoken: token }
	})
	dispatch({
		type: FETCH_USER,
		payload: res.data
	})
}

export const fetchExhibitions = token => async dispatch => {
	const res = await axios.get('/exhibitions/all', {
		headers: { firebasetoken: token }
	})
	dispatch({
		type: FETCH_EXHIBITIONS,
		payload: res.data
	})
}

export const fetchVotes = token => async dispatch => {
	const res = await axios.get('/votes/all', {
		headers: { firebasetoken: token }
	})
	dispatch({
		type: FETCH_VOTES,
		payload: res.data
	})
}

export const postExhibitions = (token, exhibition) => async dispatch => {
	const res = await axios.post('/exhibitions/', exhibition, {
		headers: { firebasetoken: token }
	})
	dispatch({
		type: FETCH_VOTES,
		payload: res.data
	})
}

export const postUser = (token, user) => async dispatch => {
	const res = await axios.post('/users/', user, {
		headers: { firebasetoken: token }
	})
	dispatch({
		type: FETCH_USER,
		payload: res.data
	})
}

export const tokenHandler = token => {
	return {
		type: TOKEN,
		payload: token
	}
}
