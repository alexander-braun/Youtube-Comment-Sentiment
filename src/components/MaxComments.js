import React, { useState, useEffect } from 'react'
import { scaleOrdinal, scaleLinear } from "d3"

function MaxComments({ lowestComment, highestComment }) {

    const colorScale = scaleLinear()
        .domain([-2, 2])
        .range(['rgb(238, 0, 0)', 'rgb(66, 230, 0)'])

    const styleHighest = {
        color: colorScale(highestComment[0])
    }

    const styleLowest = {
        color: colorScale(lowestComment[0])
    }

    return (
        <div className="maxcomments">
            <h4>Highest vs. Lowest Sentiment:</h4>
            <div className="max_c_element">
                <div className="text" style={styleHighest}>
                    {highestComment && (highestComment[0] > 0 ? '+' : '') + highestComment[0].toString().slice(0, 5)}
                </div>
                <div className="sentiment">
                    {`"${highestComment[1]}"`}
                </div>
            </div>
            <div className="max_c_element">
                <div className="text" style={styleLowest}>
                    {lowestComment && (lowestComment[0] > 0 ? '+' : '') + lowestComment[0].toString().slice(0, 5)}
                </div>
                <div className="sentiment">
                    {`"${lowestComment[1]}"`}
                </div>
            </div>
        </div>
    )
}

export default MaxComments
