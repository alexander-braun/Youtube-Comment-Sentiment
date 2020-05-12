import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/settings.css'
import Bubblechart from './Bubblechart'
import MaxComments from './MaxComments'
import AverageSentiment from './AverageSentiment'
import Scaleline from './Scaleline'

function Display() {

    const sentiment = useSelector(state => state.sentiment.sentiment)
    const sentimentCount = useSelector(state => state.sentiment.sentimentCount)
    const highestComment = useSelector(state => state.sentiment.highestComment)
    const lowestComment = useSelector(state => state.sentiment.lowestComment)
    const videoTitle = useSelector(state => state.videoTitle)
    const keyCounts = useSelector(state => state.keyCounts)
    const commentCount = useSelector(state => state.sentiment.commentCount)

    if(!sentiment) return null
    return (
        <div className="Display">
            <MaxComments lowestComment={lowestComment} highestComment={highestComment} />
            <AverageSentiment sentiment={sentiment} />
            <Bubblechart data={keyCounts} />
        </div>
    )
}

export default Display
