import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Navbar from "../components/Navbar"
import App from "../views/App"
import Login from "../views/Login"

function Routes() {
	return (
		<Router>
			<React.Fragment>
				<Navbar />
				<Switch>
					<Route exact path='/' component={App} />
					<Route exact path='/login' component={Login} />
				</Switch>
			</React.Fragment>
		</Router>
	)
}

export default Routes
