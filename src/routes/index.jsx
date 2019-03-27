import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// Components
import Navbar from "../components/Navbar"

// Views
import ProtectedRoute from "../auth/ProtectedRoute"
import App from "../views/App"
import Login from "../views/Login"

// Contexts
const UserContext = React.createContext({ user: null })

const Routes = props => {
	return (
		<UserContext.Provider>
			<Router>
				<React.Fragment>
					<Navbar />
					<Switch>
						<ProtectedRoute path='/dashboard' component={App} />
						<Route exact path='/' component={Login} />
					</Switch>
				</React.Fragment>
			</Router>
		</UserContext.Provider>
	)
}

export default Routes
