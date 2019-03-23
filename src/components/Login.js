import React, { Component } from "react";
import firebase from "../database/firebase";
import {
	Grid,
	Form,
	Segment,
	Button,
	Header,
	Message,
	Icon
} from "semantic-ui-react";

export default class Login extends Component {
	state = {
		phoneNumber: '',
		errors: [],
		loading: false
	};

	componentDidMount() {
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container",
			{
				size: "invisible"
				// other options
			});
	}

	displayErrors = errors =>
		errors.map((error, i) => <p key={i}>{error.message}</p>);

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();
		if (this.isFormValid(this.state)) {
			this.setState({ errors: [], loading: true });

			const appVerifier = window.recaptchaVerifier;

			firebase
				.auth()
				.signInWithPhoneNumber(this.state.phoneNumber, appVerifier)
				.then(confirmResult => {
					console.log(confirmResult);
					
					// TODO Input for verification code
					confirmResult.confirm()
				})
				.catch(err => {
					console.error(err);
					this.setState({
						errors: this.state.errors.concat(err),
						loading: false
					});
				});
		}
	};

	isFormValid = ({ phoneNumber }) => phoneNumber;

	handleInputError = (errors, inputName) => {
		return errors.some(error => error.message.toLowerCase().includes(inputName))
			? "error"
			: "";
	};

	render() {
		const { phoneNumber, errors, loading } = this.state;

		return (
			<Grid textAlign='center' verticalAlign='middle' className='app'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h1' icon textAlign='center'>
						<Icon name='eye' color='blue' />
						Login for extended view
					</Header>
					<Form onSubmit={this.handleSubmit} size='large'>
						<Segment stacked>
							<Form.Input
								fluid
								name='phoneNumber'
								iconPosition='left'
								placeholder='Phone Number'
								onChange={this.handleChange}
								value={phoneNumber}
								className={this.handleInputError(errors, "email")}
								type='text'
							/>
							<Button
								disabled={loading}
								className={loading ? "loading" : ""}
								color='blue'
								fluid
								size='large'
							>
								Login
							</Button>
						</Segment>
					</Form>
					{errors.length > 0 && (
						<Message error>
							<h3>Error</h3>
							{this.displayErrors(errors)}
						</Message>
					)}
					<div id="recaptcha-container"></div>
				</Grid.Column>
			</Grid>
		);
	}
}
