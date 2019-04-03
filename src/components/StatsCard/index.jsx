import React from "react"
import "./StatsCard.css"

const StatsCard = (props) => {
	return (
		<div className='StatsCard'>
			<div className='stats__content'>
				<h4 className='stats__title'>{props.title}</h4>
				<div className='divider-50' />
				<div className='clock'>
					<p>{props.content}</p>
				</div>
			</div>
		</div>
	)
}

export default StatsCard
