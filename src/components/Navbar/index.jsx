import React from 'react'
import { Link } from 'react-router-dom'
import { Consumer } from '../../contexts/AuthContext'
import './Navbar.css'
import logo from '../../assets/images/hvl-logo.png'

const Navbar = props => {
	return (
		<Consumer>
			{({ isAuth, logout }) => {
				return (
					<header className='header'>
						<div>
							<Link to='/dashboard' className='header__link'>
								<img src={logo} style={{ height: '45px' }} alt='HVL Logo' />
							</Link>
						</div>
						<nav className='nav'>
							<ul className='nav__items'>
								{isAuth ? (
									<li className='nav__item'>
										<Link to='/dashboard' className='nav__link'>
											Dashboard
										</Link>
									</li>
								) : null}
								<li className='nav__item'>
									<Link to='/about' className='nav__link'>
										About
									</Link>
									{!isAuth ? (
										<li className='nav__item'>
											<Link to='/' className='nav__link'>
												Login
											</Link>
										</li>
									) : (
										<li className='nav__item'>
											<Link onClick={logout} to='/' className='nav__link'>
												Logout
											</Link>
										</li>
									)}
								</li>
							</ul>
						</nav>
					</header>
				)
			}}
		</Consumer>
	)
}

export default Navbar
