import axios from 'axios'
import {
	FETCH_USER,
	FETCH_EXHIBITIONS,
	FETCH_VOTES,
	TOKEN,
	POST_EXHIBITIONS,
	POST_VOTES
} from './types'

export const fetchUser = token => async dispatch => {
	const res = await axios.get('/users/user', {
		headers: { firebasetoken: token }
	})
	return new Promise((resolve, reject) => {
		dispatch({
			type: FETCH_USER,
			payload: res.data
		})
		resolve(res.data)
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
		type: POST_EXHIBITIONS,
		payload: res.data
	})
}

export const postVote = (token, vote) => async dispatch => {
	const res = await axios.post('/votes/', vote, {
		headers: { firebasetoken: token }
	})
	dispatch({
		type: POST_VOTES,
		payload: res.data
	})
}

export const postUser = token => async dispatch => {
	const res = await axios.post(
		'/users/',
		{},
		{
			headers: { firebasetoken: token }
		}
	)
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
