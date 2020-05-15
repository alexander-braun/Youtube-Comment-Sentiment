import { SET_COMMENTS } from '../actions/constants'

export const comments = (state = {}, action) => {
    switch(action.type) {
        case SET_COMMENTS:
            return action.comments
        default:
            return state
    }
}