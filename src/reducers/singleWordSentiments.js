import { 
    SET_HIGHEST_SENTIMENT_SINGLE_WORDS, 
    SET_LOWEST_SENTIMENT_SINGLE_WORDS
} from '../actions/constants'

const initialState = {
    highestSingleWords: [],
    lowestSingleWords: []
}

export const singleWordSentiments = (state = initialState, action) => {
    switch(action.type) {
        case SET_LOWEST_SENTIMENT_SINGLE_WORDS:
            return {
                ...state,
                highestSingleWords: action.highestSingleWords
            }
        case SET_HIGHEST_SENTIMENT_SINGLE_WORDS:
            return {
                ...state,
                lowestSingleWords: action.lowestSingleWords
            }
        default:
            return state
    }
}