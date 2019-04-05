import axios from 'axios'
import {
	FETCH_USER,
	FETCH_EXHIBITIONS,
	FETCH_VOTES,
	TOKEN,
	POST_EXHIBITIONS,
	POST_VOTES
} from './types'

let host
if (process.env.NODE_ENV === 'production') {
	host = "https://api.expo.sondregjellestad.space"
} else {
	host = "http://localhost:8080/"
}

export const fetchUser = token => async dispatch => {
	const res = await axios.get(`${host}/users`, {
		headers: { FirebaseToken: token }
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
	const res = await axios.get(`${host}/exhibitions`, {
		headers: { FirebaseToken: token }
	})
	dispatch({
		type: FETCH_EXHIBITIONS,
		payload: res.data
	})
}

export const fetchVotes = token => async dispatch => {
	const res = await axios.get(`${host}/votes/all`, {
		headers: { FirebaseToken: token }
	})
	dispatch({
		type: FETCH_VOTES,
		payload: res.data
	})
}

export const postExhibitions = (token, exhibition) => async dispatch => {
	const res = await axios.post(`${host}/exhibitions`, exhibition, {
		headers: { FirebaseToken: token }
	})
	dispatch({
		type: POST_EXHIBITIONS,
		payload: res.data
	})
}

export const postVote = (token, vote) => async dispatch => {
	const res = await axios.post(`${host}/votes`, vote, {
		headers: { FirebaseToken: token }
	})
	dispatch({
		type: POST_VOTES,
		payload: res.data
	})
}

export const postUser = token => async dispatch => {
	const res = await axios.post(
		`${host}/users`,
		{},
		{
			headers: { FirebaseToken: token }
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
