import React, { Component, useState, useEffect } from "react"

import useHTTP from "../../hooks/http"

import { Redirect } from "react-router-dom"
import firebase from "../../database/firebase"
import { Consumer } from "../../contexts/AuthContext"
import "./Login.css"
import logo from "../../assets/images/hvl_logo.png"
import logo_firebase from "../../assets/images/firebase.png"

class Login extends Component {
	constructor(props) {
		super(props)

		/*
		// Inputs
		const [phoneNumber, changePhoneNumber] = useState("")
		const [verificationCode, changeVerificationCode] = useState("")


		useEffect(() => {
			console.log("HELLO")
		}, phoneNumber)

		// Component did mount
		useEffect(() => {
			window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
				"recaptcha-container",
				{ size: "invisible" }
			)
			console.log("did mount")
		}, {})
		*/

		this.state = {
			phoneNumber: "",
			verificationCode: "",
			codeInput: false,
			confirmResult: null,
			errors: [],
			loading: false,
			loggedInUser: null
		}
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
			.then(user => {
				console.log(user)
				this.setState({ loggedInUser: user })
			})
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
					{({ login, isAuth }) => (
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
										<button className='form__button' onClick={login}>
											Submit
										</button>
									</form>
								</div>
							)}
							{isAuth ? <Redirect to='/dashboard' /> : null}
							<div>
								<img className='firebase' src={logo_firebase} alt='Firebase' />
							</div>
							<div>
								<span className='form__label'>
									Authentication provided by Firebase
								</span>
							</div>
						</div>
					)}
				</Consumer>
			</div>
		)
	}
}

export default Login
