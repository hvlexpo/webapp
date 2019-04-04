import React, { Component } from "react"
import "./Dashboard.css"
import { connect } from "react-redux"
import * as actions from "../../actions"
import Stats from "./Stats"
import Exhibiton from "../../components/Exhibition"

class Dashboard extends Component {
	state = { newExpo: false }

	componentDidMount() {
		this.props.fetchExhibitions(this.props.token)
		this.props.fetchVotes(this.props.token)
	}

	componentWillUnmount() {
		clearInterval(this.intervalID)
	}

	handleNewExpo = (event) => {
		setTimeout(this.setState({ newExpo: true }), 1000)
	}

	renderExhibitions() {
		return this.props.exhibitions.map((exhibition) => {
			return (
				<Exhibiton
					key={exhibition.id}
					name={exhibition.name}
					description={exhibition.description}
					image={exhibition.photo}
					totalVotes={this.countVotes(exhibition)}
				/>
			)
		})
	}

	countVotes(exhibition) {
		const filter = this.props.votes.filter(
			(vote) => parseInt(vote.exhibition_id) === parseInt(exhibition.id)
		)
		const sum = filter.map((vote) => vote.weight)
		return sum.reduce((acc, total) => {
			return acc + total
		}, 0)
	}

	render() {
		const { newExpo } = this.state

		return (
			<main className='Dashboard'>
				<section className='dashboard__header'>
					<Stats totalVotes={this.props.votes.length} />
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
					<div className='Exhibitions'>{this.renderExhibitions()}</div>
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
