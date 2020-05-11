import { 
    SET_SENTIMENT, 
    SET_SENTIMENT_COUNT, 
    SET_HIGHEST_COMMENT, 
    SET_LOWEST_COMMENT,
    SET_COMMENT_COUNT
} from './constants'

export const setSentiment = sentiment => ({
    type: SET_SENTIMENT,
    sentiment
})

export const setSentimentCount = sentimentCount => ({
    type: SET_SENTIMENT_COUNT,
    sentimentCount
})

export const setHighestComment = highestComment => ({
    type: SET_HIGHEST_COMMENT,
    highestComment
})

export const setLowestComment = lowestComment => ({
    type: SET_LOWEST_COMMENT,
    lowestComment
})

export const setCommentCount = commentCount => ({
    type: SET_COMMENT_COUNT,
    commentCount
})