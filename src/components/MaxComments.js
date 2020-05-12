import React, { useState, useEffect } from 'react'

function MaxComments({ lowestComment, highestComment }) {

    
    return (
        <div className="maxcomments">
            <div className="highest_comment">
                <p className="title">Heighest Sentiment Comment</p>
                <div className="sentiment">
                    {`"${highestComment[1]}"`}
                </div>
                <div className="text">
                    {highestComment && highestComment[0].toString().slice(0, 5)}
                </div>
            </div>
            <div className="lowest_comment">
                <p className="title">Lowest Sentiment Comment</p>
                <div className="sentiment">
                    {`"${lowestComment[1]}"`}
                </div>
                <div className="text">
                    {lowestComment && lowestComment[0].toString().slice(0, 5)}
                </div>
            </div>
        </div>
    )
}

export default MaxComments
