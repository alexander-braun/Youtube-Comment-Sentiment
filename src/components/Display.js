import React from 'react'
import { useSelector } from 'react-redux'
import Bubblechart from './Bubblechart'
import MaxComments from './MaxComments'
import TitleStats from './TitleStats'
import InfiniteScrollWindow from './InfiniteScrollWindow'

function Display() {

    const sentiment = useSelector(state => state.sentiment.sentiment)
    const sentimentCount = useSelector(state => state.sentiment.sentimentCount)
    const highestComment = useSelector(state => state.sentiment.highestComment)
    const lowestComment = useSelector(state => state.sentiment.lowestComment)
    const videoTitle = useSelector(state => state.videoTitle)
    const keyCounts = useSelector(state => state.keyCounts)
    const commentCount = useSelector(state => state.sentiment.commentCount)
    const singleWordSentiments = useSelector(state => state.singleWordSentiments)

    if(!sentiment) return null
    return (
        <div className="Display">
            <TitleStats videoTitle={videoTitle} />
            <MaxComments 
                sentimentCount={sentimentCount} 
                lowestComment={lowestComment} 
                highestComment={highestComment} 
                sentiment={sentiment} 
            />
            <InfiniteScrollWindow />
            <Bubblechart data={keyCounts} dataSingleWords={singleWordSentiments}/>
        </div>
    )
}

export default Display
