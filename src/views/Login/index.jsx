import React, { Component } from "react"
import firebase from "../../database/firebase"
import "./Login.css"

class Login extends Component {
	state = {
		phoneNumber: ""
	}

	componentDidMount() {
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
			"recaptcha-container",
			{
				size: "invisible"
				// other options
			}
		)
	}

	displayErrors = errors =>
		errors.map((error, i) => <p key={i}>{error.message}</p>)

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleSubmit = event => {
		event.preventDefault()
		if (this.isFormValid(this.state)) {
			firebase
				.auth()
				.signInWithPhoneNumber(this.state.phoneNumber, window.recaptchaVerifier)
				.then(confirmResult => {
					console.log(confirmResult)

					// TODO Input for verification code
					confirmResult.confirm()
				})
				.catch(err => {
					console.error(err)
				})
		}
	}

	isFormValid = ({ phoneNumber }) => phoneNumber

	handleInputError = (errors, inputName) => {
		return errors.some(error => error.message.toLowerCase().includes(inputName))
			? "error"
			: ""
	}

	render() {
		const { phoneNumber } = this.state

		return (
			<div className='form__wrapper'>
				<form className='form__login' onSubmit={this.handleSubmit}>
					<span>Your phonenumber:</span>
					<input
						placeholder='Phonenumber'
						className='form__input'
						onChange={this.handleChange}
						value={phoneNumber}
					/>
					<button className='form__button'>Login</button>
				</form>
			</div>
		)
	}
}

export default Login
