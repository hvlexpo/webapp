import React from 'react'
import './Exhibition.css'
import { Slide } from 'react-slideshow-image'

const properties = {
	duration: 5000,
	transitionDuration: 500,
	infinite: true,
	arrows: true
}

const Exhibition = props => (
	<div className='card' key={props.id}>
		<div className='image'>{Slideshow(props.photos)}</div>
		<div className='content'>
			<h4 style={{ textAlign: 'center' }}>{props.name}</h4>
			<div>
				<p style={{ textAlign: 'center' }}>Nr. {props.id}</p>
			</div>
			<div className='description'>
				<h2 style={{ textAlign: 'center' }}>Total votes: {props.totalVotes}</h2>
			</div>
		</div>
	</div>
)

const Slideshow = photos => {
	return (
		<Slide {...properties}>
			{photos.map((each, index) => (
				<div className='each-slide' key={index}>
					<div style={{ backgroundImage: `url(${each})` }} />
				</div>
			))}
		</Slide>
	)
}

export default Exhibition
