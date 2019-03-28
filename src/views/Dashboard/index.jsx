import React from "react"
import "./Dashboard.css"
import hvl_logo from "../../assets/images/hvl-logo.png"
import expo_logo from "../../assets/images/expo-transparent.png"

const Dashboard = props => {
	return (
		<main className='Dashboard'>
			<section className='dashboard__header'>
				<div className='dashboard__brand'>
					<img src={expo_logo} alt='HVL Logo' />
					<h1>HVL Expo</h1>
				</div>
			</section>
			<section className='dashboard__content'>
				<h1>Stats about expos</h1>
			</section>
		</main>
	)
}

export default Dashboard
