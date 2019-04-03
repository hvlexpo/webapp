import React, { Component } from 'react'
import './Dashboard.css'
import StatsCard from '../../components/StatsCard'

class Stats extends Component {
	state = {
		time: new Date().toLocaleString(),
		totalVotes: 0
	}

	componentDidMount() {
		this.intervalID = setInterval(() => this.tick(), 1000)
	}

	componentWillUnmount() {
		clearInterval(this.intervalID)
	}

	tick() {
		this.setState({
			time: new Date().toLocaleString(),
			totalVotes: this.props.totalVotes
		})
	}
	render() {
		const { time, totalVotes } = this.state

		return (
			<div className='dashboard__brand'>
				<StatsCard title='Total votes' content={totalVotes} />
				<StatsCard title='Local time' content={time} />
			</div>
		)
	}
}
export default Stats
