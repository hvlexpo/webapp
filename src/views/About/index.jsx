import React from "react"
import NorwayMap from "../../components/NorwayMap"
import "./About.css"

const About = props => {
	return (
		<main className='About'>
			<section className='about__intro'>
				<h1 className='about__title'>About</h1>
				<div className='divider-50' />
				<div className='about__mapWrapper'>
					<NorwayMap />
					<div className='about__team'>
						<h2 className='team__title'>We represent Norway!</h2>
						<p className='team__text'>
							We are a diverse team with nine students. From Trøndelag to
							Buskerud and <br /> from Rogaland to Hordaland. We are the
							creators behind HVL Expo.
						</p>
					</div>
				</div>
			</section>
			<section className='social__wrapper'>
				<div>Hello</div>
			</section>
		</main>
	)
}

export default About
