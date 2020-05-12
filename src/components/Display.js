import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/settings.css'
import Bubblechart from './Bubblechart'

function Display() {

    const sentiment = useSelector(state => state.sentiment.sentiment)
    const sentimentCount = useSelector(state => state.sentiment.sentimentCount)
    const highestComment = useSelector(state => state.sentiment.highestComment)
    const lowestComment = useSelector(state => state.sentiment.lowestComment)
    const videoTitle = useSelector(state => state.videoTitle)
    const keyCounts = useSelector(state => state.keyCounts)
    const commentCount = useSelector(state => state.sentiment.commentCount)
    console.log(highestComment, lowestComment)
    return (
        <div className="Display">
            <Bubblechart data={keyCounts} />
        </div>
    )
}

export default Display
