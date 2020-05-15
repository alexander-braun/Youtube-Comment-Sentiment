import { SET_HIGHEST_AND_LOWEST_COMMENT_COUNT } from './constants'

export const setHighestAndLowestCommentCount = highLowCommentCount => ({
    type: SET_HIGHEST_AND_LOWEST_COMMENT_COUNT,
    highLowCommentCount
})