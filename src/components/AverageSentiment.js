import React from 'react'
import { scaleLinear } from "d3"

function AverageSentiment({ sentiment, sentimentCount }) {

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
            <div className="sentiment">
                <div className="sentiment-count">
                    <div className="low-sentiment" style={{color:'rgb(217, 29, 0)'}}>
                        Negative Sentiments:   {sentimentCount[0]}
                    </div>
                    <div className="neutral-sentiment" >
                        Neutral Sentiments: {sentimentCount[1]}
                    </div>
                    <div className="high-sentiment" style={{color:'rgb(66, 230, 0)'}}>
                        Positive Sentiments: {sentimentCount[2]}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AverageSentiment
