import { SET_COUNTRIES } from '../actions/constants'

export const countries = (state = [], action) => {
    switch(action.type) {
        case SET_COUNTRIES:
            return action.countries
        default:
            return state
    }
}