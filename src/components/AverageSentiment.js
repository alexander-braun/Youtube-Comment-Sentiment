import React, { useState, useEffect } from 'react'
import { scaleOrdinal, scaleLinear } from "d3"

function AverageSentiment({ sentiment }) {

    const color = () => {
        const range = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
        const colorArrPos = ['#00cc00', '#6ace6a', '#99d099']
        const colorArrNeg = ['#cc0000', '#ce6a6a', '#d09999']
        
    }

    const colorScale = scaleLinear()
        .domain([-.4, .4])
        .range(['red', 'green'])
    const style = {
        color: colorScale(sentiment)
    }

    return (
        <div className="average_sentiment">
            <p>Average Sentiment:</p>
            <div style={style}>{(sentiment > 0 ? '+' : '') + sentiment.toString().slice(0, 7)}</div>
        </div>
    )
}

export default AverageSentiment
