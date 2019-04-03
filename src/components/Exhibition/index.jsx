import React from "react"
import "./Exhibition.css"

const Exhibiton = (props) => (
	<div className='Exhibiton' key={props.key}>
		<h2 className='exhibition__title'>{props.name}</h2>
		<p className='exhibition__description'>{props.exhibition}</p>
		<img className='exhibition__image' src={props.image} alt='Exhibition' />
		<span className='exhibition__votes'>Total votes: {props.totalVotes}</span>
	</div>
)

export default Exhibiton
