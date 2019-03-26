import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

class Navbar extends Component {
	render() {
		return (
			<header className='header'>
				<div>
					<Link to='/' className='header__link'>
						HVL EXPO
					</Link>
				</div>
				<nav className='nav'>
					<ul className='nav__items'>
						<li className='nav__item'>
							<Link to='/' className='nav__link'>
								Home
							</Link>
						</li>
						<li className='nav__item'>
							<Link to='/about' className='nav__link'>
								About
							</Link>
						</li>
						<li className='nav__item'>
							<Link to='/popular' className='nav__link'>
								Popular
							</Link>
						</li>
						<li className='nav__item'>
							<Link to='/login' className='nav__link'>
								Login
							</Link>
						</li>
					</ul>
				</nav>
			</header>
		)
	}
}

export default Navbar
