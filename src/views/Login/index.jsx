import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../database/firebase'
import { AuthContext, Consumer } from '../../contexts/AuthContext'
import './Login.css'
import logo from '../../assets/images/hvl_logo.png'
import logo_firebase from '../../assets/images/firebase.png'
import { connect } from 'react-redux'
import { fetchUser, postUser, tokenHandler } from '../../actions'

class Login extends Component {
	static contextType = AuthContext
	constructor(props) {
		super(props)

		this.state = {
			phoneNumber: '',
			verificationCode: '',
			codeInput: false,
			confirmResult: null,
			errors: [],
			loading: false,
			loggedInUser: null
		}
	}

	componentDidMount() {
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
			'recaptcha-container',
			{ size: 'invisible' }
		)
	}

	displayErrors = errors =>
		errors.map((error, i) => <p key={i}>{error.message}</p>)

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	handleSubmit = event => {
		console.log('handleSubmit')
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

			this.setState({ phoneNumber: '', codeInput: true })
		}
	}

	handleVerificationCode = event => {
		event.preventDefault()
		this.state.confirmResult
			.confirm(this.state.verificationCode)
			.then(({ user }) => {
				this.setState({ loggedInUser: user })
				this.context.login()
			})
			.catch(err => {
				return ''
			})

		firebase
			.auth()
			.currentUser.getIdToken(true)
			.then(idToken => {
				this.props.tokenHandler(idToken)
				this.props.fetchUser(idToken)
			})
			.then(() => {
				if (!this.props.user) {
					this.props.postUser(this.props.token)
				}
			})

		this.setState({
			verificationCode: '',
			codeInput: false,
			confirmResult: null
		})
	}

	isFormValid = ({ phoneNumber }) => phoneNumber

	handleInputError = (errors, inputName) => {
		return errors.some(error => error.message.toLowerCase().includes(inputName))
			? 'error'
			: ''
	}

	render() {
		const { phoneNumber, codeInput, verificationCode } = this.state

		return (
			<div className='Login'>
				<Consumer>
					{({ isAuth }) => (
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

const mapStateToProps = ({ user, token }) => {
	return { user, token }
}

export default connect(
	mapStateToProps,
	{
		fetchUser,
		postUser,
		tokenHandler
	}
)(Login)
