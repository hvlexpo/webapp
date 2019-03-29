import React, { Component } from "react"
import firebase from "../../database/firebase"
import { Consumer } from "../../contexts/AuthContext"
import "./Login.css"
import logo from "../../assets/images/hvl_logo.png"

class Login extends Component {
	state = {
		phoneNumber: "",
		verificationCode: "",
		codeInput: false,
		confirmResult: null,
		errors: [],
		loading: false,
		loggedInUser: null
	}

	componentDidMount() {
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
			"recaptcha-container",
			{ size: "invisible" }
		)
	}

	displayErrors = errors =>
		errors.map((error, i) => <p key={i}>{error.message}</p>)

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleSubmit = event => {
		console.log("handleSubmit")
		event.preventDefault()
		if (this.isFormValid(this.state)) {
			this.setState({ errors: [], loading: true })

			firebase
				.auth()
				.signInWithPhoneNumber(this.state.phoneNumber, window.recaptchaVerifier)
				.then(confirmResult => {
					console.log(confirmResult)
					this.setState({ confirmResult })
				})
				.catch(err => {
					console.error(err)
					this.setState({
						errors: this.state.errors.concat(err),
						loading: false
					})
				})

			this.setState({ phoneNumber: "", codeInput: true })
		}
	}

	handleVerificationCode = event => {
		event.preventDefault()
		this.state.confirmResult
			.confirm(this.state.verificationCode)
			.then(user => this.setState({ loggedInUser: user }))
			.catch(err => {
				return ""
			})

		this.setState({
			verificationCode: "",
			codeInput: false,
			confirmResult: null
		})
	}

	isFormValid = ({ phoneNumber }) => phoneNumber

	handleInputError = (errors, inputName) => {
		return errors.some(error => error.message.toLowerCase().includes(inputName))
			? "error"
			: ""
	}

	render() {
		const { phoneNumber, codeInput, verificationCode } = this.state

		return (
			<div className='Login'>
				<Consumer>
					{({ isAuth, login, logout }) => (
						<div className='form__wrapper'>
							<img className='form__image' src={logo} alt='HVL Logo' />
							{!codeInput ? (
								<div>
									<form className='form__login' onSubmit={this.handleSubmit}>
										<input
											className='form__input'
											name='phoneNumber'
											onChange={this.handleChange}
											value={phoneNumber}
										/>
										<span className='form__label'>Phone number</span>
										<button className='form__button'>Login</button>
									</form>
								</div>
							) : (
								<div>
									<form
										className='form__login'
										onSubmit={this.handleVerificationCode}
									>
										<input
											className='form__input'
											name='verificationCode'
											onChange={this.handleChange}
											value={verificationCode}
										/>
										<span className='form__label'>Recived code</span>
										<button className='form__button'>Submit</button>
									</form>
								</div>
							)}
						</div>
					)}
				</Consumer>
			</div>
		)
	}
}

export default Login
