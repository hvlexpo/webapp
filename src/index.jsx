import React from "react"
import ReactDOM from "react-dom"

import App from "./App"

import "./index.css"

import { AuthProvider, AuthContext } from "./contexts/AuthContext"

ReactDOM.render(
	<AuthProvider>
		<AuthContext.Consumer>
			{({ isAuth, user }) => <App isAuth={isAuth} user={user} />}
		</AuthContext.Consumer>
	</AuthProvider>,
	document.getElementById("root")
)
