import React from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import mapData from "./mapData.js"
import "./NorwayMap.css"

require("highcharts/indicators/pivot-points")(Highcharts)
require("highcharts/indicators/macd")(Highcharts)
require("highcharts/modules/exporting")(Highcharts)
require("highcharts/modules/map")(Highcharts)

const mapOptions = {
	chart: {
		borderWidth: 1,
		borderColor: "transparent",
		marginRight: 20,
		display: "inline-block"
	},
	title: {
		text: ""
	},
	legend: {
		layout: "vertical",
		align: "right",
		floating: true,
		backgroundColor:
			(Highcharts.theme && Highcharts.theme.legendBackgroundColor) ||
			"rgba(255, 255, 255, 0.85)"
	},
	colorAxis: {
		min: 0,
		max: 9,
		tickInterval: 5,
		stops: [[0, "#ffffff"], [0.65, "#4badbd"], [1, "#004357"]],
		labels: {
			format: "{value}"
		}
	},
	tooltip: {
		pointFormatter: function() {
			return this.properties["woe-label"].split(",")[0]
		}
	},
	series: [
		{
			mapData: mapData,
			dataLabels: {
				formatter: function() {
					return this.point.properties["woe-label"].split(",")[0]
				}
			},
			states: {
				hover: {
					color: "#da532c"
				}
			},
			name: "Norway",
			data: [
				["no-mr", 0],
				["no-st", 1],
				["no-ho", 6],
				["no-sf", 0],
				["no-va", 0],
				["no-of", 0],
				["no-nt", 0],
				["no-ro", 1],
				["no-bu", 1],
				["no-vf", 0],
				["no-fi", 0],
				["no-no", 0],
				["no-tr", 0],
				["no-ak", 0],
				["no-op", 0],
				["no-he", 0],
				["no-os", 0],
				["no-te", 0],
				["no-aa", 0]
			]
		}
	]
}

const MapChart = ({ options, highcharts }) => (
	<HighchartsReact
		highcharts={highcharts}
		constructorType={"mapChart"}
		options={options}
	/>
)

const NorwayMap = props => {
	return (
		<div className='Map'>
			<MapChart options={mapOptions} highcharts={Highcharts} />
		</div>
	)
}

export default NorwayMap
