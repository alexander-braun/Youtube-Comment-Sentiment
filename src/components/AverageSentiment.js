import React, { useState, useEffect } from 'react'
import { scaleOrdinal, scaleLinear } from "d3"

function AverageSentiment({ sentiment }) {

    const colorScale = scaleLinear()
        .domain([-.4, .4])
        .range(['rgb(238, 0, 0)', 'rgb(66, 230, 0)'])
    const style = {
        color: colorScale(sentiment)
    }

    return (
        <div className="average_sentiment">
            <h4>Average Sentiment / 100 comments:</h4>
            <div style={style}>{(sentiment > 0 ? '+' : '') + sentiment.toString().slice(0, 4)}</div>
        </div>
    )
}

export default AverageSentiment
