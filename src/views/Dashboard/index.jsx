import React, { Component } from 'react'
import './Dashboard.css'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Stats from './Stats'
import Exhibition from '../../components/Exhibition'

class Dashboard extends Component {
	state = {
		newExpoTitle: 'Add Exhibition',
		newExpo: false,
		newVoteTitle: 'Vote',
		newVote: false,
		name: '',
		photos: [],
		exhibition_id: '',
		weight: ''
	}

	componentDidMount() {
		this.props.fetchExhibitions(this.props.token)
		this.props.fetchVotes(this.props.token)
	}

	componentWillUnmount() {
		clearInterval(this.intervalID)
	}

	handleNewExpo = event => {
		if (this.state.newExpo) {
			this.setState({ newExpoTitle: 'Add Exhibition', newExpo: false })
		} else {
			this.setState({ newExpoTitle: 'Cancel', newExpo: true })
			this.setState({ newVoteTitle: 'Vote', newVote: false })
		}
	}

	handleNewVote = event => {
		if (this.state.newVote) {
			this.setState({ newVoteTitle: 'Vote', newVote: false })
		} else {
			this.setState({ newVoteTitle: 'Cancel', newVote: true })
			this.setState({ newExpoTitle: 'Add Exhibition', newExpo: false })
		}
	}

	renderExhibitions() {
		return this.props.exhibitions.map(exhibition => {
			return (
				<Exhibition
					key={exhibition.id}
					id={exhibition.id}
					name={exhibition.name}
					photos={exhibition.photos}
					totalVotes={this.countVotes(exhibition)}
				/>
			)
		})
	}

	postNewExhibition = event => {
		event.preventDefault()
		const id = this.props.exhibitions.length + 1
		const { name, photos } = this.state
		this.props.postExhibitions(this.props.token, {
			id: id.toString(),
			name,
			photos: JSON.parse(photos)
		})
		this.handleNewExpo()
		this.setState({ name: '', photos: [] })
	}

	postNewVote = event => {
		event.preventDefault()
		const { exhibition_id, weight } = this.state
		this.props.postVote(this.props.token, {
			exhibition_id,
			weight
		})
		this.handleNewVote()
		this.setState({ exhibition_id: '', weight: '' })
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	countVotes(exhibition) {
		const filter = this.props.votes.filter(
			vote => parseInt(vote.exhibition_id) === parseInt(exhibition.id)
		)
		const sum = filter.map(vote => {
			return parseInt(vote.weight)
		})
		return sum.reduce((acc, total) => {
			return acc + total
		}, 0)
	}

	render() {
		const {
			newExpoTitle,
			newExpo,
			name,
			photos,
			newVote,
			newVoteTitle,
			exhibition_id,
			weight
		} = this.state

		return (
			<main className='Dashboard'>
				<section className='dashboard__header'>
					<Stats totalVotes={this.props.votes.length} />
				</section>
				<section className='dashboard__content'>
					<div className='dashboard__functions'>
						<h1 className='dashboard__title'>Dashboard</h1>
						<button onClick={this.handleNewExpo} className='btn__add'>
							{newExpoTitle}
						</button>
						<button onClick={this.handleNewVote} className='btn__add'>
							{newVoteTitle}
						</button>
					</div>
					<div className='divider-50' />
					{newExpo ? (
						<div className='ui container'>
							<div className='new__form'>
								<h3 className='new__form-title'>Add new Exhibition</h3>
								<form onSubmit={this.postNewExhibition}>
									<span>Name</span>
									<input
										onChange={this.handleChange}
										name='name'
										value={name}
										type='text'
									/>
									<span>Photos (["url","url"])</span>
									<input
										onChange={this.handleChange}
										value={photos}
										name='photos'
										type='text'
									/>
									<button style={{ marginTop: '15px' }} className='ui button'>
										Add new Exhibition
									</button>
								</form>
							</div>
						</div>
					) : null}
					{newVote ? (
						<div className='ui container'>
							<div className='new__form'>
								<h3 className='new__form-title'>Vote</h3>
								<form onSubmit={this.postNewVote}>
									<span>Exhibition Nr</span>
									<input
										onChange={this.handleChange}
										name='exhibition_id'
										value={exhibition_id}
										type='text'
									/>
									<span>Weight</span>
									<input
										onChange={this.handleChange}
										value={weight}
										name='weight'
										type='text'
									/>
									<button style={{ marginTop: '15px' }} className='ui button'>
										Submit Vote
									</button>
								</form>
							</div>
						</div>
					) : null}
					<div className='ui link cards'>{this.renderExhibitions()}</div>
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
