import React, { Component } from "react"
import firebase from "../../database/firebase"
import "./Login.css"

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
				<div className='form__wrapper'>
					{!codeInput ? (
						<div>
							<form className='form__login' onSubmit={this.handleSubmit}>
								<span>Your phonenumber:</span>
								<input
									placeholder='Phonenumber'
									className='form__input'
									name='phoneNumber'
									onChange={this.handleChange}
									value={phoneNumber}
								/>{" "}
								<button className='form__button'>Login</button>
							</form>
						</div>
					) : (
						<div>
							<form
								className='form__login'
								onSubmit={this.handleVerificationCode}
							>
								<span>Your recived code:</span>
								<input
									placeholder='Enter digits'
									className='form__input'
									name='verificationCode'
									onChange={this.handleChange}
									value={verificationCode}
								/>
								<button className='form__button'>Submit</button>
							</form>
						</div>
					)}
				</div>
			</div>
		)
	}
}

export default Login
