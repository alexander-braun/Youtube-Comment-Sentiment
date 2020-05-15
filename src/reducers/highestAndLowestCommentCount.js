import { SET_HIGHEST_AND_LOWEST_COMMENT_COUNT } from '../actions/constants'

export const highestAndLowestCommentCount = (state = {}, action) => {
    switch(action.type) {
        case SET_HIGHEST_AND_LOWEST_COMMENT_COUNT:
            return action.highLowCommentCount
        default:
            return state
    }
}