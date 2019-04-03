import React, { Component } from "react"
import firebase from "../database/firebase"
import { connect } from "react-redux"
import { fetchUser } from "../actions/index"

export const AuthContext = React.createContext()

export class Provider extends Component {
	state = { isAuth: false }

	constructor() {
		super()
		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)
	}

	login() {
		this.setState({ isAuth: true })
	}

	logout() {
		firebase
			.auth()
			.signOut()
			.catch(function(error) {
				console.error(error)
			})
		this.setState({ isAuth: false })
	}

	render() {
		return (
			<AuthContext.Provider
				value={{
					isAuth: this.state.isAuth,
					login: this.login,
					logout: this.logout
				}}
			>
				{this.props.children}
			</AuthContext.Provider>
		)
	}
}

const mapStateToProps = ({ exhibitions, votes, token }) => {
	return { exhibitions, votes, token }
}

export const Consumer = AuthContext.Consumer
