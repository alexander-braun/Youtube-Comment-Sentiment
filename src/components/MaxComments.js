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

    const highestCommentLikes = useSelector(state => state.highestAndLowestCommentCount[0])
    const lowestCommentLikes = useSelector(state => state.highestAndLowestCommentCount[1])

    return (
        <div className="maxcomments">
            <div className="max_c_element">
                <span className="title-card">
                    <div>Highest Sentiment</div>
                    <span className="text" style={styleHighest}>
                        {highestComment && (highestComment[0] > 0 ? '+' : '') + highestComment[0].toString().slice(0, 5)}
                    </span>
                </span>
                <div className="sentiment">
                    {`"${highestComment[1]}"`}
                </div>
                <div className="comment-likes">
                    Likes: {highestCommentLikes}
                </div>
            </div>
            <div className="max_c_element">
                <span className="title-card">
                    <div>Lowest Sentiment</div>
                    <span className="text" style={styleLowest}>
                        {lowestComment && (lowestComment[0] > 0 ? '+' : '') + lowestComment[0].toString().slice(0, 5)}
                    </span>
                </span>
                <div className="sentiment">
                    {`"${lowestComment[1]}"`}
                </div>
                <div className="comment-likes">
                    Likes: {lowestCommentLikes}
                </div>
            </div>

            <div className="max_c_element average-card">
                <span className="title-card">
                    <div>Average Sentiment:</div>
                    <span className="text" style={styleLowest}>
                        {(sentiment > 0 ? '+' : '') + sentiment.toString().slice(0, 4)}
                    </span>
                </span>
                <div className="sentiment">
                    Negative Sentiments:   {sentimentCount[0]}
                </div>
                <div className="sentiment">
                    Neutral Sentiments: {sentimentCount[1]}
                </div>
                <div className="sentiment">
                    Positive Sentiments: {sentimentCount[2]}
                </div>
                <div className="comment-likes">
                    Likes: {lowestCommentLikes}
                </div>
            </div>
        </div>
    )
}

export default MaxComments
