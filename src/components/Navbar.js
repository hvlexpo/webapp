import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default class Navbar extends Component {
	state = { activeItem: "Overview" };

	handleClick = (event, { name }) => this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;

		return (
			<Menu>
				<Menu.Item header>HVL EXPO</Menu.Item>
				<Link to='/'>
					<Menu.Item
						onClick={this.handleClick}
						name='Overview'
						active={activeItem === "Overview"}
					/>
				</Link>
				<Link to='/about'>
					<Menu.Item
						onClick={this.handleClick}
						name='About'
						active={activeItem === "About"}
					/>
				</Link>
				<Link to='/login'>
					<Menu.Item
						onClick={this.handleClick}
						name='Login'
						active={activeItem === "Login"}
					/>
				</Link>
			</Menu>
		);
	}
}
