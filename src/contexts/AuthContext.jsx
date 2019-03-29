import React, { Component } from "react"
import firebase from "../database/firebase"

const AuthContext = React.createContext()

export class Provider extends Component {
	state = { isAuth: true, user: null }

	constructor() {
		super()
		this.login = this.login.bind(this)
		this.logout = this.logout.bind(this)
	}

	login() {
		setTimeout(() => this.setState({ isAuth: true }), 1000)
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

export const Consumer = AuthContext.Consumer
