import React from "react"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom"

// Components
import Navbar from "./components/Navbar"

// Views
import Login from "./views/Login"

// Contexts
import { Consumer } from "./contexts/AuthContext"

const ProtectedRoute = ({ component: Component, ...rest }) => (
	<Consumer>
		{({ isAuth }) => (
			<Route
				render={props =>
					isAuth ? <Component {...props} /> : <Redirect to='/' />
				}
				{...rest}
			/>
		)}
	</Consumer>
)

const App = props => {
	return (
		<Consumer>
			{value => {
				return (
					<Router>
						<React.Fragment>
							<Navbar />
							<Switch>
								<ProtectedRoute path='/dashboard' component={App} />
								<Route exact path='/' component={Login} />
							</Switch>
						</React.Fragment>
					</Router>
				)
			}}
		</Consumer>
	)
}

export default App
