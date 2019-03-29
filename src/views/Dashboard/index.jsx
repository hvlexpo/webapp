import React, { Component } from "react"
import "./Dashboard.css"

import StatsCard from "../../components/StatsCard"

class Dashboard extends Component {
	state = {
		time: new Date().toLocaleString()
	}

	componentDidMount() {
		this.intervalID = setInterval(() => this.tick(), 1000)
	}

	componentWillUnmount() {
		clearInterval(this.intervalID)
	}

	tick() {
		this.setState({
			time: new Date().toLocaleString()
		})
	}

	render() {
		const { time } = this.state

		return (
			<main className='Dashboard'>
				<section className='dashboard__header'>
					<div className='dashboard__brand'>
						<StatsCard title='Total votes' content='Loading...' />
						<StatsCard title='Local time' content={time} />
					</div>
				</section>
				<section className='dashboard__content'>
					<h1 className='dashboard__title'>Statistics</h1>
					<div className='divider-50' />
				</section>
			</main>
		)
	}
}

export default Dashboard
