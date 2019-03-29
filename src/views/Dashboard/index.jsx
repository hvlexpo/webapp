import React from "react"
import "./Dashboard.css"

import StatsCard from "../../components/StatsCard"

const Dashboard = props => {
	return (
		<main className='Dashboard'>
			<section className='dashboard__header'>
				<div className='dashboard__brand'>
					<StatsCard />
					<StatsCard />
					<StatsCard />
					<StatsCard />
				</div>
			</section>
			<section className='dashboard__content'>
				<h1 className='dashboard__title'>Statistics</h1>
				<div className='divider-50' />
			</section>
		</main>
	)
}

export default Dashboard
