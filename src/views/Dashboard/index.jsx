import React, { Component } from 'react'
import './Dashboard.css'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import StatsCard from '../../components/StatsCard'

class Dashboard extends Component {
	state = {
		time: new Date().toLocaleString(),
		newExpo: false
	}

	componentDidMount() {
		this.intervalID = setInterval(() => this.tick(), 1000)
		this.props.fetchExhibitions(this.props.token)
		this.props.fetchVotes(this.props.token)
	}

	componentWillUnmount() {
		clearInterval(this.intervalID)
	}

	tick() {
		this.setState({
			time: new Date().toLocaleString()
		})
	}

	handleNewExpo = event => {
		setTimeout(this.setState({ newExpo: true }), 1000)
	}

	render() {
		const { time, newExpo } = this.state

		return (
			<main className='Dashboard'>
				<section className='dashboard__header'>
					<div className='dashboard__brand'>
						<StatsCard title='Total votes' content='Loading...' />
						<StatsCard title='Local time' content={time} />
					</div>
				</section>
				<section className='dashboard__content'>
					<div className='dashboard__functions'>
						<h1 className='dashboard__title'>Dashboard</h1>
						<button onClick={this.handleNewExpo} className='btn__add'>
							Add new
						</button>
						<button className='btn__add'>Start Expo</button>
						<button className='btn__add'>Stop Expo</button>
					</div>
					<div className='divider-50' />
					{newExpo ? (
						<div className='new__form'>
							<h3 className='new__form-title'>Add new Expo</h3>
							<form>
								<input type='text' />
								<span>Name</span>
								<input type='text' />
								<span>Name</span>
								<input type='text' />
								<span>Name</span>
							</form>
						</div>
					) : null}
				</section>
			</main>
		)
	}
}

const mapStateToProps = ({ exhibitions, votes, token }) => {
	return { exhibitions, votes, token }
}

export default connect(
	mapStateToProps,
	actions
)(Dashboard)
