import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import Navbar from "./components/Navbar";
import Login from "./components/Login";


const Root = () => {
	const apiHost = 'api.expo.sondregjellestad.space'

	return (
		<Router>
			<React.Fragment>
				<Navbar />
				<Switch>
					<Route exact path='/' component={App} />
					<Route path='/login' component={Login} />
				</Switch>
			</React.Fragment>
		</Router>
	)
}

ReactDOM.render(<Root />, document.getElementById("root"));

