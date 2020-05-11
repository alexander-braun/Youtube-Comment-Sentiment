import { 
    SET_SENTIMENT, 
    SET_SENTIMENT_COUNT, 
    SET_HIGHEST_COMMENT, 
    SET_LOWEST_COMMENT, 
    SET_COMMENT_COUNT
} from '../actions/constants'

const initialState = {
    sentiment: 0,
    sentimentCount: [null, null],
    highestComment: '',
    lowestComment: '',
    commentCount: 0
}

export const sentiment = (state = initialState, action) => {
    switch(action.type) {
        case SET_SENTIMENT:
            return {
                ...state,
                sentiment: action.sentiment
            }
        case SET_SENTIMENT_COUNT:
            return {
                ...state,
                sentimentCount: action.sentimentCount
            }
        case SET_HIGHEST_COMMENT:
            return {
                ...state,
                highestComment: action.highestComment
            }
        case SET_LOWEST_COMMENT:
            return {
                ...state,
                lowestComment: action.lowestComment
            }
        case SET_COMMENT_COUNT:
            return {
                ...state,
                commentCount: action.commentCount
            }
        default:
            return state
    }
}