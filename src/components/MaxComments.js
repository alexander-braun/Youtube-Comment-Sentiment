import React, { useState, useEffect } from 'react'
import { scaleOrdinal, scaleLinear } from "d3"
import { useSelector } from 'react-redux'

function MaxComments({ lowestComment, highestComment, sentiment, sentimentCount }) {

    const colorScale = scaleLinear()
        .domain([-2, 2])
        .range(['rgb(238, 0, 0)', 'rgb(66, 230, 0)'])

    const styleHighest = {
        color: colorScale(highestComment[0])
    }

    const styleLowest = {
        color: colorScale(lowestComment[0])
    }

    const average = {
        color: colorScale(sentiment)
    }

    const highestCommentLikes = useSelector(state => state.highestAndLowestCommentCount[0])
    const lowestCommentLikes = useSelector(state => state.highestAndLowestCommentCount[1])

    const generateSentimentField = () => {
        const headings = ['Highest Sentiment', 'Lowest Sentiment', 'Average Sentiment']
        let output = []
        for(let heading of headings) {
            output.push(
                <div className="max_c_element">
                    <span className="title-card">
                        <div>{heading}</div>
                        <span 
                            className="text" 
                            style={
                                heading === 'Lowest Sentiment' ? 
                                styleLowest : heading === 'Highest Sentiment' ? 
                                styleHighest : average}>
                            {   
                                heading === 'Highest Sentiment' ? 
                                highestComment && (highestComment[0] > 0 ? '+' : '') + highestComment[0].toString().slice(0, 5) :
                                heading === 'Lowest Sentiment' ?
                                lowestComment && (lowestComment[0] > 0 ? '+' : '') + lowestComment[0].toString().slice(0, 5) :
                                (sentiment > 0 ? '+' : '') + sentiment.toString().slice(0, 4)
                            }
                        </span>
                    </span>
                    {
                        heading === 'Highest Sentiment' || heading === 'Lowest Sentiment' ?
                        (
                            <div className="sentiment">
                                {
                                    heading === 'Highest Sentiment' ? 
                                    `"${highestComment[1]}"` : heading === 'Lowest Sentiment' ? 
                                    `"${lowestComment[1]}"` : null
                                }
                            </div>
                        ) : null
                    }
                    {
                        heading === 'Average Sentiment' ? 
                        (
                            <div className="average-card">
                                <div className="sentiment">
                                    Negative Sentiments: {sentimentCount[0]}
                                </div>
                                <div className="sentiment">
                                    Neutral Sentiments: {sentimentCount[1]}
                                </div>
                                <div className="sentiment">
                                    Positive Sentiments: {sentimentCount[2]}
                                </div>
                            </div>
                        ) : null
                    }
                    {
                        heading === 'Lowest Sentiment' ? 
                        (
                            <div className="comment-likes">
                                Likes: 
                                {lowestCommentLikes}
                            </div>
                        ) : heading === 'Highest Sentiment' ?
                        (
                            <div className="comment-likes">
                                Likes: 
                                {highestCommentLikes}
                            </div>
                        ) : (
                            <div className="comment-likes">
                                Comments: {sentimentCount.reduce((a, b) => a + b)}
                            </div>
                        )
                    }
                </div>
            )
        }
        return output
    }

    return (
        <div className="maxcomments">
            {generateSentimentField()}
        </div>
    )
}

export default MaxComments
